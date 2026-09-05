// Fonction serverless Vercel — la clé API reste ici, côté serveur.
// Elle n'est jamais visible dans le navigateur.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { sujet, audience } = req.body || {};

  if (!sujet || sujet.trim().length < 3) {
    return res.status(400).json({ error: "Décris ton sujet en quelques mots." });
  }

  const prompt = `Tu écris des accroches (hooks) pour des vidéos courtes TikTok et Instagram Reels, en français.

SUJET DE LA VIDÉO : ${sujet}
${audience ? `PUBLIC VISÉ : ${audience}` : ""}

Génère 12 accroches. Règles absolues :

1. Chaque accroche fait 12 mots maximum. Elle doit se lire en moins de 2 secondes.
2. Niveau de lecture simple. Un ado de 12 ans doit la comprendre du premier coup, sans effort.
3. Zéro ambiguïté : impossible de la comprendre de travers, même une demi-seconde.
4. Elle doit fonctionner à l'écrit, affichée à l'écran, sans le son.
5. Pas de mots abstraits ("optimiser", "asymétrie", "stratégie", "levier", "mindset").
6. Pas de point d'exclamation. Pas d'emoji. Pas de majuscules d'emphase.
7. Elle crée une tension : le spectateur doit avoir besoin de connaître la suite.

Répartis-les en 4 catégories, 3 accroches par catégorie :

- "chiffre" : s'appuie sur un nombre concret et précis
- "contradiction" : casse une croyance répandue
- "identification" : le spectateur s'y reconnaît immédiatement
- "curiosite" : ouvre une question sans y répondre

Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ni après, sans balises markdown :
{"chiffre":["...","...","..."],"contradiction":["...","...","..."],"identification":["...","...","..."],"curiosite":["...","...","..."]}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Erreur API Anthropic:", response.status, detail);
      return res
        .status(502)
        .json({ error: "La génération a échoué. Réessaie dans un instant." });
    }

    const data = await response.json();
    let texte = data.content?.[0]?.text || "";

    // On enlève d'éventuelles balises markdown autour du JSON
    texte = texte.replace(/```json|```/g, "").trim();

    let hooks;
    try {
      hooks = JSON.parse(texte);
    } catch {
      console.error("JSON invalide reçu:", texte);
      return res
        .status(502)
        .json({ error: "Réponse illisible. Réessaie dans un instant." });
    }

    return res.status(200).json({ hooks });
  } catch (err) {
    console.error("Erreur serveur:", err);
    return res
      .status(500)
      .json({ error: "Le serveur ne répond pas. Réessaie dans un instant." });
  }
}
