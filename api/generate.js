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

  const prompt = `Tu es spécialiste des accroches de vidéos courtes TikTok et Instagram, en français.

SUJET DE LA VIDÉO : ${sujet}
${audience ? `PUBLIC VISÉ : ${audience}` : ""}

Génère 12 accroches en t'appuyant sur les structures ci-dessous.

═══ CE QUI FAIT QU'UNE ACCROCHE MARCHE ═══

L'ENJEU EST PERSONNEL. L'accroche parle du spectateur, pas de toi. "Voilà pourquoi tes vidéos ne marchent pas" bat "je vais t'expliquer les hooks".

ELLE EST CONCRÈTE. Un détail précis bat une généralité. "143 vues" bat "peu de vues". "Trois secondes" bat "le début".

ELLE CRÉE UN MANQUE. Le spectateur doit sentir qu'il lui manque une information qu'il devrait avoir. La curiosité naît d'un vide, pas d'une promesse.

ELLE EST IMMÉDIATEMENT CLAIRE. Si le spectateur doit relire ou réfléchir, il est parti. Niveau de lecture d'un enfant de 12 ans.

ELLE FONCTIONNE EN MUET. Elle doit se lire à l'écran, seule, sans contexte, sans le son.

═══ STRUCTURES ÉPROUVÉES ═══

Utilise ces armatures et remplis-les avec le sujet donné. Adapte, ne recopie pas mécaniquement.

Structure "erreur cachée" :
- "Arrête de [action] si tu veux [résultat]"
- "L'erreur que font 90% des [public]"
- "Tu fais ça sans le savoir, et ça tue [résultat]"

Structure "croyance cassée" :
- "Tout ce que tu sais sur [sujet] est faux"
- "[Action évidente] ne te fera pas [résultat attendu]"
- "Opinion impopulaire : [affirmation qui dérange]"

Structure "chiffre choc" :
- "[Nombre] secondes pour [enjeu]"
- "[Pourcentage] des [public] échouent à cause de ça"
- "Je suis passé de [chiffre bas] à [chiffre haut]"

Structure "manque d'information" :
- "Personne ne parle de [chose importante]"
- "Ce que j'aurais aimé savoir avant [action]"
- "[Nombre] choses que personne ne te dira sur [sujet]"

Structure "miroir" :
- "Si tu [situation précise du spectateur], écoute bien"
- "Tu [action], et il ne se passe rien. Voilà pourquoi."
- "Toi aussi tu [comportement gênant mais courant] ?"

Structure "test à ta place" :
- "J'ai testé [chose] pour que tu n'aies pas à le faire"
- "J'ai [action] pendant [durée]. Voilà le résultat."

═══ RESPECTE LA STRUCTURE ANNONCÉE ═══

Lis attentivement le sujet. S'il annonce un nombre d'éléments — "3 raisons", "5 erreurs", "les techniques" — les accroches doivent refléter ce nombre et ce pluriel.

Exemple : sujet "les 3 raisons qui font que tes vidéos ne décollent pas"
✗ "Voilà ton erreur" (singulier, ne correspond pas)
✗ "3 secondes : c'est là que tu perds tout" (parle d'un seul point)
✓ "3 raisons qui expliquent tes 143 vues"
✓ "Tes vidéos ne décollent pas. Il y a 3 causes."

Si le sujet ne mentionne aucun nombre, tu es libre du singulier ou du pluriel.

Le spectateur doit comprendre dès l'accroche ce qu'il va recevoir. Une accroche qui promet une seule chose alors que la vidéo en livre trois crée une rupture d'attente.

═══ VARIE LES ANGLES ═══

Les 12 accroches ne doivent pas tourner autour du même argument. Si tu écris trois fois "les 3 premières secondes", tu n'offres qu'un seul choix déguisé en douze.

Chaque accroche doit attaquer le sujet par un angle différent : le résultat, la cause, le temps perdu, la comparaison, l'émotion, le coût de l'inaction, l'erreur inverse.

═══ INTERDICTIONS ═══

- Plus de 12 mots
- Mots abstraits : optimiser, stratégie, levier, mindset, asymétrie, potentiel, révolutionner
- Points d'exclamation, emojis, majuscules d'emphase
- Superlatifs creux : incroyable, ultime, secret, magique, fou
- Toute formule qui pourrait s'appliquer à n'importe quel sujet
- Promesses invérifiables

═══ AVANT DE RENDRE CHAQUE ACCROCHE ═══

Relis-la seule, sans le sujet. Trois questions :
1. Peut-on la comprendre de travers ? Si oui, réécris plus simple.
2. Pourrait-elle servir pour un autre sujet ? Si oui, elle est trop vague — ajoute un détail concret tiré du sujet donné.
3. Si le sujet annonce un nombre, l'accroche le respecte-t-elle ? Une vidéo qui livre 3 raisons ne peut pas être annoncée par une accroche au singulier.

Puis relis les 12 ensemble : si plusieurs disent la même chose autrement, remplace-les par d'autres angles.

═══ RÉPARTITION ═══

3 accroches par catégorie :
- "chiffre" : un nombre concret et précis porte l'accroche
- "contradiction" : casse une croyance que le public tient pour vraie
- "identification" : décrit une situation vécue, le spectateur s'y reconnaît
- "curiosite" : ouvre une boucle sans la fermer

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
