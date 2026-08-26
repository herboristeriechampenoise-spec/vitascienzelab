// api/send-prep-email.js
function formatDateFr(dateStr) {
  if (!dateStr) return "";
  try {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const monthIdx = parseInt(parts[1], 10) - 1;
      const dayNum = parseInt(parts[2], 10);

      const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
      ];
      const days = [
        "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"
      ];

      const d = new Date(year, monthIdx, dayNum, 12, 0, 0);
      const dayName = days[d.getDay()];
      const monthName = months[monthIdx];

      return `${dayName} ${dayNum} ${monthName} ${year}`;
    }
  } catch(e) {}
  return dateStr;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const BREVO_KEY = process.env.BREVO_API_KEY;

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const { clientName, clientEmail, patientId, rdvDate, slot } = body || {};

  if (!clientEmail) {
    return res.status(400).json({ error: "Champs manquants: clientEmail requis" });
  }

  const dateToUse = rdvDate || new Date().toISOString().split("T")[0];
  const slotToUse = slot || "17:00";
  const formattedDate = formatDateFr(dateToUse);
  const firstName = (clientName || "").split(" ")[0] || "Client";

  // Direct questionnaire link to client ID or email (pure email notification, no appointment row created in DB)
  const questUrl = "https://vitascienzelab.vercel.app?questionnaire=" + encodeURIComponent(patientId || clientEmail);
  const clientSpaceUrl = "https://vitascienzelab.vercel.app";

  try {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #003891, #1565C0); padding: 30px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { margin: 8px 0 0 0; font-size: 14px; opacity: 0.9; }
    .content { padding: 30px 24px; line-height: 1.6; font-size: 15px; }
    .content p { margin: 0 0 16px 0; }
    .card { background: #f8fafc; border-left: 4px solid #1565C0; padding: 16px; margin: 20px 0; border-radius: 6px; }
    .card h3 { margin: 0 0 8px 0; color: #003891; font-size: 16px; }
    .btn { display: inline-block; background-color: #1565C0; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-top: 8px; }
    .footer { background-color: #f1f5f9; padding: 20px 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    .legal { font-size: 11px; color: #94a3b8; margin-top: 12px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>VITASCIENZELAB</h1>
      <p>Herboristerie Champenoise</p>
    </div>
    <div class="content">
      <p>Bonjour ${firstName},</p>
      <p>Nous avons le plaisir de vous confirmer notre séance de discussion prévue le <strong>${formattedDate} à ${slotToUse}</strong>.</p>
      <p>Afin de préparer au mieux notre échange et de prendre connaissance de vos besoins et attentes, nous vous invitons à réaliser les démarches suivantes :</p>
      
      <div class="card">
        <h3>1. 📋 Remplir votre questionnaire de préparation</h3>
        <p style="margin-bottom:12px; font-size:14px;">Merci d'indiquer votre objectif principal et de lister vos éventuels médicaments ou compléments alimentaires actuels :</p>
        <a href="${questUrl}" class="btn">Remplir le questionnaire de préparation</a>
      </div>

      <div class="card">
        <h3>2. 📁 Déposer vos documents médicaux</h3>
        <p style="margin-bottom:12px; font-size:14px;">Si vous disposez de documents médicaux récents (bilans sanguins, analyses, ordonnances ou comptes-rendus) permettant de prendre acte de votre état de santé général, vous pouvez les téléverser sur votre espace personnel :</p>
        <a href="${clientSpaceUrl}" class="btn" style="background-color:#0284c7;">Accéder à mon espace client</a>
      </div>

      <p>Ces éléments me permettront d'étudier votre dossier en amont afin de personnaliser pleinement notre séance.</p>
      <p style="margin-top:24px;">Restant à votre entière disposition,</p>
      <p><strong>Bien cordialement,</strong><br>VITASCIENZELAB – Herboristerie Champenoise<br><a href="mailto:herboristeriechampenoise@gmail.com" style="color:#1565C0;">herboristeriechampenoise@gmail.com</a></p>
    </div>
    <div class="footer">
      <div><strong>VITASCIENZELAB</strong> · Herboristerie Champenoise</div>
      <div class="legal">
        <strong>ℹ️ MENTIONS LÉGALES & AVERTISSEMENT :</strong><br>
        Les conseils et accompagnements de VITASCIENZELAB relèvent exclusivement du bien-être et de la sélection de compléments alimentaires. Ils ne constituent pas un acte médical et ne se substituent en aucun cas à un avis, diagnostic ou traitement médical délivré par un médecin ou un professionnel de santé qualifié.<br>
        SIRET : 841 057 730 00019
      </div>
    </div>
  </div>
</body>
</html>`;

    const emailSubject = `📋 Préparation de votre séance du ${formattedDate} à ${slotToUse} – VITASCIENZELAB`;

    if (BREVO_KEY) {
      const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
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
          to: [{ email: clientEmail }],
          subject: emailSubject,
          htmlContent
        })
      });

      if (!emailRes.ok) {
        const err = await emailRes.text();
        console.error("Brevo send error:", err);
        return res.status(500).json({ error: "Erreur Brevo: " + err });
      }
    }

    return res.status(200).json({
      success: true,
      formattedDate,
      message: "Email de préparation envoyé à " + clientEmail
    });

  } catch (err) {
    console.error("send-prep-email error:", err);
    return res.status(500).json({ error: err.message });
  }
}