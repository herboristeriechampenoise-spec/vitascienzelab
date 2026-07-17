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
      }
    } catch (err) {
      console.error("Auth validation error:", err);
    }
  }

  if (!isAdmin) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 2. Fetch all profiles
    const profilesRes = await fetch(`${Ge}/rest/v1/profiles?select=email,prenom,nom`, {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`
      }
    });

    if (!profilesRes.ok) {
      const pText = await profilesRes.text();
      throw new Error(`Supabase load profiles failed: ${pText}`);
    }

    const profiles = await profilesRes.json();
    const clientsList = profiles.filter(p => p.email && p.email.includes("@") && p.email.trim() !== "");
    console.log(`Sending bug fix notifications to ${clientsList.length} clients...`);

    // 3. Send emails
    const emailPromises = clientsList.map(async client => {
      const emailSubject = "🌿 Votre espace client VitaScienzeLab est de nouveau pleinement opérationnel";
      const prenom = client.prenom || "";
      const emailHtml = `<div style="font-family: sans-serif; padding: 20px; max-width: 550px; line-height: 1.6; color: #37474F; margin: 0 auto; background: #F8FAFF; border-radius: 16px;">
        <div style="background: linear-gradient(135deg, #004D40, #00695C); padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
          <div style="font-size: 32px; margin-bottom: 8px;">🌿</div>
          <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">VITASCIENZELAB</h1>
          <p style="color: #B2DFDB; margin: 4px 0 0 0; font-size: 12px;">Herboristerie Champenoise</p>
        </div>
        <div style="padding: 24px; background: #ffffff; border-radius: 0 0 12px 12px; border: 1px solid #ECEFF1; border-top: none;">
          <h2 style="color: #004D40; font-size: 16px; margin-top: 0; margin-bottom: 16px;">Bonjour ${prenom},</h2>
          <p>J'espère que vous vous portez bien.</p>
          <p>Dans le cadre de l'amélioration de notre service, nous avons récemment procédé à une mise à niveau majeure de la sécurité de notre plateforme afin de garantir la confidentialité absolue de vos données personnelles.</p>
          <p>Ce renforcement de sécurité a malheureusement entraîné deux dysfonctionnements temporaires ces derniers jours :</p>
          <ul style="padding-left: 20px; margin: 12px 0; color: #455A64;">
            <li style="margin-bottom: 8px;"><strong>Réservations</strong> : Certaines prises de rendez-vous en ligne n'ont pas pu s'enregistrer correctement dans notre agenda (bien qu'un e-mail de confirmation ait pu vous être envoyé).</li>
            <li style="margin-bottom: 8px;"><strong>Documents</strong> : Les fichiers (factures, protocoles, etc.) déposés sur vos fiches personnelles étaient temporairement invisibles ou impossibles à télécharger.</li>
          </ul>
          <p style="font-weight: bold; color: #00695C; margin: 20px 0 12px 0;">🎉 Tout est désormais entièrement réparé et fonctionnel !</p>
          <p>Vous pouvez dès à présent vous connecter à votre espace client pour retrouver, consulter et télécharger l'ensemble de vos documents en toute sérénité. Les prises de rendez-vous en ligne sont également pleinement opérationnelles.</p>
          <div style="text-align: center; margin: 26px 0;">
            <a href="https://vitascienzelab.vercel.app" style="background: #00695C; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 2px 8px rgba(0,105,92,0.2);">
              Accéder à mon espace client
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #CFD8DC; margin: 24px 0;"/>
          <p style="font-size: 13px; color: #546E7A;">
            Si vous aviez tenté de réserver un rendez-vous en ligne récemment et que vous avez un doute sur sa validation, ou si vous rencontrez la moindre difficulté, n'hésitez pas à me contacter directement.
          </p>
          <div style="background: #F5F7FA; padding: 14px; border-radius: 8px; font-size: 13px; margin: 16px 0; border-left: 4px solid #00695C; color: #37474F;">
            <strong>VitaScienzeLab - Herboristerie Champenoise</strong><br/>
            📞 06 72 66 68 09<br/>
            🌐 <a href="https://vitascienzelab.vercel.app" style="color: #00695C; text-decoration: none; font-weight: bold;">vitascienzelab.vercel.app</a>
          </div>
          <p style="margin-top: 24px; margin-bottom: 0;">
            Merci infiniment pour votre confiance et votre compréhension,<br/>
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
        console.error(`Error sending email to ${client.email}:`, err);
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
    console.error("Bug notification sending failed:", err);
    return res.status(500).json({ error: err.message });
  }
}
