// Fonction Vercel serverless — clé Brevo stockée en variable d'environnement
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Protection contre l'utilisation abusive externe hors application VitaScienzeLab
  const origin = String(req.headers.origin || req.headers.referer || "");
  if (origin && !origin.includes("vitascienzelab") && !origin.includes("localhost") && !origin.includes("127.0.0.1")) {
    return res.status(403).json({ error: "Forbidden origin" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Corps JSON invalide" });
  }

  const { to, subject, htmlContent } = body || {};
  const cleanTo = String(to || "").trim();

  if (!cleanTo || cleanTo === "—" || !cleanTo.includes("@")) {
    return res.status(200).json({ success: true, skipped: true });
  }

  if (!subject || !htmlContent) {
    return res.status(400).json({ error: "Paramètres manquants" });
  }

  const BREVO_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_KEY) {
    console.error("BREVO_API_KEY non configurée dans Vercel");
    return res.status(500).json({ error: "Configuration email manquante" });
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "VITASCIENZELAB – Herboristerie Champenoise",
          email: "herboristeriechampenoise@gmail.com",
        },
        to: [{ email: cleanTo }],
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Erreur Brevo:", error);
      return res.status(500).json({ error: "Échec envoi email" });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Erreur proxy email:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
