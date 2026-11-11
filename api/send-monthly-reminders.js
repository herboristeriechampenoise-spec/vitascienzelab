const Ge = "https://zbavzvcnmlwbsepfsnbi.supabase.co";

export default async function handler(req, res) {
  const BREVO_KEY = process.env.BREVO_API_KEY;
  const SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE;

  if (!BREVO_KEY || !SERVICE_KEY) {
    console.error("Missing keys on server. BREVO_KEY or SERVICE_KEY.");
    return res.status(500).json({ error: "Missing configuration keys" });
  }

  // 1. Authorization check (allow Vercel Cron or authenticated Admin user)
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;
  const isVercelCron = cronSecret ? (authHeader === `Bearer ${cronSecret}`) : (req.headers["x-vercel-cron"] === "true");

  let isAdmin = false;

  if (!isVercelCron && authHeader) {
    try {
      // Validate admin token against Supabase Auth
      const userRes = await fetch(`${Ge}/auth/v1/user`, {
        headers: {
          apikey: process.env.VITE_SUPABASE_ANON_KEY || SERVICE_KEY || "",
          Authorization: authHeader
        }
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        if (userData.email === "herboristeriechampenoise@gmail.com") {
          isAdmin = true;
        }
      }
    } catch (err) {
      console.error("Auth validation error in reminders cron:", err);
    }
  }

  if (!isVercelCron && !isAdmin) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 2. Fetch profiles & appointments in parallel using the service key
    const [profilesRes, appointmentsRes] = await Promise.all([
      fetch(`${Ge}/rest/v1/profiles?select=id,email,prenom,nom`, {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`
        }
      }),
      fetch(`${Ge}/rest/v1/appointments?select=id,patient_email,patient_name,service_title,service_icon,service_dur,rdv_date,slot,status,reminder_sent`, {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`
        }
      })
    ]);

    if (!profilesRes.ok || !appointmentsRes.ok) {
      const pText = await profilesRes.text();
      const aText = await appointmentsRes.text();
      throw new Error(`Supabase load failed: profiles=${pText}, appointments=${aText}`);
    }

    const profiles = await profilesRes.json();
    const appointments = await appointmentsRes.json();

    // 2b. Daily 48h appointment reminder check (runs automatically every day via Vercel Cron)
    const nowMs = Date.now();
    let reminders48hSent = 0;
    const due48h = (Array.isArray(appointments) ? appointments : []).filter(a => {
      if (!a || a.status !== "confirmed" || a.reminder_sent) return false;
      if (!a.rdv_date || !a.slot || !a.patient_email || !a.patient_email.includes("@")) return false;
      const [h, m] = String(a.slot).split(":").map(Number);
      const d = new Date(a.rdv_date + "T12:00:00Z");
      d.setUTCHours((h || 12) - 1, m || 0, 0, 0);
      const diffHours = (d.getTime() - nowMs) / 3600000;
      return diffHours > 0 && diffHours <= 52;
    });

    for (const rdv of due48h) {
      try {
        const formattedDate = new Date(rdv.rdv_date + "T12:00:00").toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        });
        const reminderHtml = `<div style="font-family:sans-serif;padding:24px;max-width:520px;margin:0 auto;background:#fff;border-radius:16px;border:1px solid #E3F2FD;color:#37474F;line-height:1.6">
          <div style="background:linear-gradient(135deg,#003891,#1565C0);padding:20px;border-radius:12px;text-align:center;color:#fff;margin-bottom:20px">
            <div style="font-size:26px">⏰</div>
            <h2 style="margin:6px 0 0;font-size:18px">Rappel de votre séance VITASCIENZELAB</h2>
          </div>
          <p>Bonjour <strong>${rdv.patient_name || ""}</strong>,</p>
          <p>Nous vous rappelons votre séance prévue dans moins de 48h :</p>
          <div style="background:#F0F4FF;border-radius:12px;padding:16px;margin:16px 0">
            <div><strong>Prestation :</strong> ${rdv.service_icon || "🌿"} ${rdv.service_title || "Séance bien-être"}</div>
            <div><strong>Date :</strong> ${formattedDate}</div>
            <div><strong>Horaire :</strong> ${rdv.slot}</div>
            <div><strong>Lieu :</strong> 9 Rue du Champ Pile, 10320 Bouilly (Aube)</div>
          </div>
          <p style="font-size:12px;color:#546E7A">En cas d'empêchement, vous pouvez modifier votre rendez-vous depuis votre espace personnel sur <a href="https://vitascienzelab.vercel.app">vitascienzelab.vercel.app</a> ou par SMS au 06 72 66 68 09.</p>
          <p style="font-size:11px;color:#90A4AE;margin-top:20px">VITASCIENZELAB – Herboristerie Champenoise · SIRET : 841 057 730 00019</p>
        </div>`;

        const mailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": BREVO_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            sender: {
              name: "VITASCIENZELAB – Herboristerie Champenoise",
              email: "herboristeriechampenoise@gmail.com"
            },
            to: [{ email: rdv.patient_email.trim() }],
            subject: "⏰ Rappel — Votre séance VITASCIENZELAB approche",
            htmlContent: reminderHtml
          })
        });

        if (mailRes.ok) {
          reminders48hSent++;
          await fetch(`${Ge}/rest/v1/appointments?id=eq.${encodeURIComponent(rdv.id)}`, {
            method: "PATCH",
            headers: {
              apikey: SERVICE_KEY,
              Authorization: `Bearer ${SERVICE_KEY}`,
              "Content-Type": "application/json",
              Prefer: "return=minimal"
            },
            body: JSON.stringify({ reminder_sent: true })
          });
        }
      } catch (remErr) {
        console.error("48h reminder error for", rdv.id, remErr);
      }
    }

    // If triggered by daily Vercel Cron (GET) on any day other than the 1st of the month, return after 48h reminders
    const isManualPost = req.method === "POST";
    const isFirstOfMonth = new Date().getUTCDate() === 1;
    if (!isManualPost && !isFirstOfMonth) {
      return res.status(200).json({
        success: true,
        mode: "daily_48h_check",
        reminders48hSent
      });
    }

    // 3. Compile list of unique clients by email
    const clientsMap = {};

    // First, add all profiles (registered accounts)
    profiles.forEach(p => {
      if (p.email && p.email.includes("@") && p.email.trim() !== "" && p.email !== "—") {
        const emailKey = p.email.toLowerCase().trim();
        clientsMap[emailKey] = {
          email: p.email.trim(),
          prenom: p.prenom || ""
        };
      }
    });

    // Second, add all unique emails from appointments (even those without account / admin cards)
    appointments.forEach(app => {
      if (app.patient_email && app.patient_email.includes("@") && app.patient_email.trim() !== "" && app.patient_email !== "—") {
        const emailKey = app.patient_email.toLowerCase().trim();
        if (!clientsMap[emailKey]) {
          const prenom = app.patient_name ? app.patient_name.split(" ")[0] : "";
          clientsMap[emailKey] = {
            email: app.patient_email.trim(),
            prenom: prenom || ""
          };
        }
      }
    });

    const clientsList = Object.values(clientsMap);
    console.log(`Sending monthly reminders to ${clientsList.length} clients...`);

    // 4. Send emails in parallel
    const emailPromises = clientsList.map(async client => {
      const emailSubject = "🌿 Des nouvelles de votre métabolisme — Votre suivi bien-être mensuel";
      const emailHtml = `<div style="font-family:sans-serif;padding:20px;max-width:500px;line-height:1.5;color:#37474F;">
        <h2 style="color:#00695C;margin-bottom:16px;">Bonjour ${client.prenom || ""},</h2>
        <p>J'espère que vous vous portez bien et que vous ressentez les bienfaits de vos derniers ajustements.</p>
        <p>Comme nous l'avons vu ensemble, la restructuration du métabolisme est un travail de fond qui nécessite de la régularité. Nos cellules se renouvellent constamment, et c'est dans la durée que les bienfaits profonds s'installent.</p>
        <p>Si nous ne l'avons pas déjà planifié ensemble lors de notre dernière entrevue, je vous invite à prendre un moment pour anticiper et réserver votre prochain rendez-vous directement sur notre plateforme :</p>
        <div style="margin:20px 0;">
          <a href="https://vitascienzelab.vercel.app" style="background:#00695C;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;display:inline-block;">Prendre mon rendez-vous sur VitaScienzeLab</a>
        </div>
        <hr style="border:none;border-top:1px solid #CFD8DC;margin:24px 0;"/>
        <h3 style="color:#004D40;margin-bottom:8px;">🧬 Comment parler de notre démarche autour de vous ?</h3>
        <p style="font-size:13px;color:#546E7A;">Le bouche-à-oreille est le moteur de notre développement. Si notre accompagnement vous apporte satisfaction, n'hésitez pas à en parler aux personnes de votre entourage qui rencontrent des inconforts physiques ou métaboliques.</p>
        <p style="font-size:13px;color:#546E7A;">Pour rester fidèle à notre éthique et au cadre légal de notre activité, voici comment vous pouvez définir simplement notre travail de <strong>biochimie</strong> :</p>
        <ul style="font-size:13px;color:#546E7A;padding-left:20px;margin:10px 0;">
          <li><strong>Ce que nous ne faisons pas</strong> : Nous n'apportons pas de « soins », de « diagnostics » ou de « traitements médicaux » de guérison. Cela reste le domaine exclusif du corps médical.</li>
          <li><strong>Ce que nous faisons (notre approche biochimique)</strong> : Nous travaillons à l'échelle <strong>moléculaire et cellulaire</strong> pour <strong>restructurer le métabolisme de A à Z</strong>. En redonnant à l'organisme les éléments dont il a besoin pour fonctionner de manière optimale au niveau biologique, nous l'aidons à restaurer ses équilibres de façon autonome, afin de retrouver un bien-être global et durable.</li>
        </ul>
        <p style="font-size:13px;color:#546E7A;">Si vous souhaitez partager cette approche avec des proches, n'hésitez pas à leur transmettre mes coordonnées :</p>
        <div style="background:#F5F7FA;padding:12px;border-radius:6px;font-size:13px;margin:10px 0;border-left:4px solid #00695C;">
          <strong>VitaScienzeLab - Herboristerie Champenoise</strong><br/>
          📞 06 72 66 68 09<br/>
          🌐 <a href="https://vitascienzelab.vercel.app" style="color:#00695C;">vitascienzelab.vercel.app</a>
        </div>
        <p style="margin-top:24px;">Je vous remercie infiniment pour votre confiance et votre soutien.</p>
        <p>Prenez grand soin de vous, et au plaisir de vous retrouver lors de notre prochaine entrevue.</p>
        <p><strong>Alexis</strong><br/><span style="font-size:12px;color:#90A4AE;">VitaScienzeLab</span></p>
      </div>`;

      try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": BREVO_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            sender: {
              name: "VITASCIENZELAB – Herboristerie Champenoise",
              email: "herboristeriechampenoise@gmail.com"
            },
            to: [{ email: client.email }],
            subject: emailSubject,
            htmlContent: emailHtml
          })
        });
        return { email: client.email, ok: response.ok, status: response.status };
      } catch (err) {
        console.error(`Error sending reminder to ${client.email}:`, err);
        return { email: client.email, ok: false, error: err.message };
      }
    });

    const results = await Promise.all(emailPromises);
    const failedList = results.filter(r => !r.ok);

    return res.status(200).json({
      success: true,
      total: results.length,
      sent: results.length - failedList.length,
      failed: failedList.length,
      failedDetails: failedList
    });
  } catch (err) {
    console.error("Monthly reminders execution error:", err);
    return res.status(500).json({ error: err.message });
  }
}
