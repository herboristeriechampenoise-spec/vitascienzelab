// Fonction Vercel serverless — clé Brevo stockée en variable d'environnement
// La clé n'est JAMAIS visible dans le code GitHub

export default async function handler(req, res) {
  // Autoriser uniquement les requêtes POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, subject, htmlContent } = req.body;

  // Validation basique
  if (!to || !subject || !htmlContent) {
    return res.status(400).json({ error: "Paramètres manquants" });
  }

  // La clé est stockée dans Vercel (jamais dans le code)
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
          name: "VITASCIENZELAB",
          email: "contact@herboristeriechampenoise.com",
        },
        to: [{ email: to }],
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
}
