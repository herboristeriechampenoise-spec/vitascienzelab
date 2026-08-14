const Ge = "https://zbavzvcnmlwbsepfsnbi.supabase.co";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const BREVO_KEY = process.env.BREVO_API_KEY;
  const SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE;

  if (!BREVO_KEY || !SERVICE_KEY) {
    console.error("Missing keys on server. BREVO_KEY or SERVICE_KEY.");
    return res.status(500).json({ error: "Missing configuration keys" });
  }

  // 1. Authorization check
  const authHeader = req.headers.authorization;
  let isAdmin = false;

  if (authHeader) {
    try {
      if (authHeader === `Bearer ${SERVICE_KEY}`) {
        isAdmin = true;
      } else {
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
      }
    } catch (err) {
      console.error("Auth validation error:", err);
    }
  }

  if (!isAdmin) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 2. Fetch all profiles and unique patient emails from appointments
    const profilesRes = await fetch(`${Ge}/rest/v1/profiles?select=email,prenom,nom`, {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`
      }
    });

    const apptsRes = await fetch(`${Ge}/rest/v1/appointments?select=patient_email,patient_name`, {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`
      }
    });

    let clientsMap = {};

    if (profilesRes.ok) {
      const profiles = await profilesRes.json();
      profiles.forEach(p => {
        if (p.email && p.email.includes("@")) {
          const key = p.email.toLowerCase().trim();
          clientsMap[key] = {
            email: p.email.trim(),
            prenom: p.prenom || ""
          };
        }
      });
    }

    if (apptsRes.ok) {
      const appts = await apptsRes.json();
      appts.forEach(a => {
        if (a.patient_email && a.patient_email.includes("@") && a.patient_email !== "—") {
          const key = a.patient_email.toLowerCase().trim();
          if (!clientsMap[key]) {
            clientsMap[key] = {
              email: a.patient_email.trim(),
              prenom: a.patient_name ? a.patient_name.split(" ")[0] : ""
            };
          }
        }
      });
    }

    const clientsList = Object.values(clientsMap);
    console.log(`Sending vacation notification emails to ${clientsList.length} clients...`);

    // 3. Send emails
    const emailPromises = clientsList.map(async client => {
      const emailSubject = "🌿 Information Congés & Organisation des Protocoles — VITASCIENZELAB";
      const prenom = client.prenom || "";
      const emailHtml = `<div style="font-family: sans-serif; padding: 20px; max-width: 580px; line-height: 1.6; color: #37474F; margin: 0 auto; background: #F8FAFF; border-radius: 16px;">
        <div style="background: linear-gradient(135deg, #004D40, #00695C); padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
          <div style="font-size: 32px; margin-bottom: 8px;">🌿</div>
          <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">VITASCIENZELAB</h1>
          <p style="color: #B2DFDB; margin: 4px 0 0 0; font-size: 12px;">Herboristerie Champenoise · Bouilly</p>
        </div>
        <div style="padding: 26px; background: #ffffff; border-radius: 0 0 12px 12px; border: 1px solid #ECEFF1; border-top: none;">
          <h2 style="color: #004D40; font-size: 16px; margin-top: 0; margin-bottom: 16px;">Bonjour ${prenom},</h2>
          <p>J'espère que vous passez un très bel été et que vous vous portez à merveille.</p>
          <p>Je vous informe que le laboratoire sera fermé pour <strong>congés annuels du vendredi 28 août 2026 au samedi 12 septembre 2026 inclus</strong>. La reprise des consultations et du suivi se fera dès le <strong>dimanche 13 septembre 2026</strong>.</p>
          <div style="background: #E0F2F1; border-left: 4px solid #00695C; padding: 16px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #004D40; font-size: 14px; margin: 0 0 10px 0;">📋 Anticipation de vos protocoles de bien-être :</h3>
            <ul style="padding-left: 20px; margin: 0; font-size: 13px; color: #004D40;">
              <li style="margin-bottom: 10px;">
                <strong>Votre protocole se termine entre le 9 et le 12 septembre ?</strong><br/>
                Pas d'inquiétude ! Nous pourrons faire le point ensemble à mon retour dès le 13 septembre sans aucun souci.
              </li>
              <li>
                <strong>Votre protocole se termine pendant mes congés (fin août / début septembre) ?</strong><br/>
                Merci de me contacter par message ou téléphone <strong>au plus tard le 22 août 2026</strong>. 
              </li>
            </ul>
          </div>
          <p style="font-size: 13px; color: #546E7A; background: #FFF8E1; padding: 12px 14px; border-radius: 8px;">
            ⏳ <em>Rappel utile : La préparation personnalisée de vos protocoles nécessite <strong>3 à 4 jours de fabrication</strong>. Anticiper avant le 22 août me permettra de tout préparer sereinement et de vous recevoir avant mon départ.</em>
          </p>
          <div style="text-align: center; margin: 26px 0;">
            <a href="https://vitascienzelab.vercel.app" style="background: #00695C; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 2px 8px rgba(0,105,92,0.2);">
              📅 Réserver une séance avant le 28 août
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #CFD8DC; margin: 24px 0;"/>
          <div style="background: #F5F7FA; padding: 14px; border-radius: 8px; font-size: 13px; margin: 16px 0; color: #37474F;">
            <strong>VitaScienzeLab – Herboristerie Champenoise</strong><br/>
            📞 06 72 66 68 09<br/>
            🌐 <a href="https://vitascienzelab.vercel.app" style="color: #00695C; text-decoration: none; font-weight: bold;">vitascienzelab.vercel.app</a>
          </div>
          <p style="margin-top: 24px; margin-bottom: 0;">
            Prenez bien soin de vous et à très bientôt,<br/>
            <strong>Alexis</strong><br/>
            <span style="font-size: 12px; color: #90A4AE;">VitaScienzeLab</span>
          </p>
        </div>
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
        console.error(`Error sending vacation email to ${client.email}:`, err);
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
    console.error("Vacation notification sending failed:", err);
    return res.status(500).json({ error: err.message });
  }
}
