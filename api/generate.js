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

═══ PREMIÈRE ÉTAPE OBLIGATOIRE : IDENTIFIE À QUI TU PARLES ═══

Avant tout, lis le sujet ET le public. Le champ "public visé" peut être vide, vague ou absent — dans ce cas, déduis-le du sujet lui-même.

Réponds mentalement à ces questions :

QUI EST-CE ?
Un étudiant, un salarié, un indépendant, un parent, un débutant total ? Sa situation de vie change tout ce qu'il ressent.
Si le sujet mentionne "étudiant", "salarié", "en reconversion", "à 30 ans" — c'est une information capitale, l'accroche doit s'en servir.

QU'EST-CE QUI LE BLOQUE VRAIMENT ?
Pas le blocage technique — le blocage émotionnel.
Un étudiant : le regard des potes, le manque de temps entre les cours, le sentiment de ne pas être légitime, la peur du ridicule.
Un salarié : la fatigue après le boulot, la peur que son employeur voie, le confort du salaire.
Un débutant total : ne pas savoir par où commencer, croire qu'il faut du matériel, penser qu'il est trop tard.

PARLE SA LANGUE
Utilise le vocabulaire de sa vie à lui. Pour un étudiant : les cours, les partiels, la colocation, les potes de promo, le petit job.
Une accroche qui utilise son vocabulaire lui parle dix fois plus qu'une accroche générale.

Si le public est explicitement nommé dans le sujet, au moins la moitié des accroches doivent le mentionner ou évoquer sa situation concrète. Sinon il ne se sentira pas visé.

═══ DEUXIÈME ÉTAPE : SITUE-LE DANS SON PARCOURS ═══

Avant d'écrire la moindre accroche, lis le sujet et le public, et détermine OÙ EN EST la personne à qui tu parles.

Trois situations possibles :

A) ELLE N'A PAS ENCORE COMMENCÉ
Indices : "veut se lancer", "débuter", "démarrer", "se lancer sur".
→ Elle n'a AUCUN passé sur le sujet. Elle n'a pas de vues, pas d'échecs, pas de statistiques.
→ INTERDIT : lui reprocher ses résultats, parler de ses vidéos, de ses vues, de ses mois perdus.
→ Ce qui la retient : la peur de se lancer, le regard des autres, ne pas savoir par où commencer, croire qu'il est trop tard, penser qu'il faut du matériel ou de l'argent.
→ Leviers valides : l'erreur qu'elle s'apprête à faire, le temps qu'elle perd à hésiter, ce que personne ne lui dit avant de commencer, ce que font ceux qui réussissent dès le départ.

B) ELLE A COMMENCÉ MAIS ÇA NE MARCHE PAS
Indices : "ne décollent pas", "peu de vues", "stagne", "n'y arrive pas".
→ Elle a un passé, des chiffres, des échecs. Tu peux t'appuyer dessus.
→ Leviers valides : accusation sur ses résultats, prédiction de son avenir, erreurs qu'elle répète.

C) ELLE MARCHE DÉJÀ MAIS VEUT PLUS
Indices : "scaler", "monétiser", "passer au niveau supérieur".
→ Elle a des résultats. Ne lui reproche pas ses échecs, elle n'en a pas sur ce point.
→ Leviers valides : le plafond invisible, ce qui marche à petite échelle et casse à grande échelle.

RÈGLE ABSOLUE :
Ne prête JAMAIS au spectateur une expérience qu'il n'a pas.
Si le sujet dit "veut se lancer", une accroche qui parle de ses 200 vues est fausse et il le sait immédiatement. Il scrolle, pas parce qu'elle est molle, mais parce qu'elle ne le concerne pas.

Exemple, sujet "conseils pour étudiants qui veulent se lancer sur les réseaux" :
✗ "3 mois à poster. 0€ gagné." → il n'a jamais posté
✗ "Tu filmes, tu postes, personne ne regarde" → il n'a jamais filmé
✓ "Tu veux te lancer depuis 6 mois. Tu n'as toujours rien posté."
✓ "Attends d'avoir du bon matériel et tu ne commenceras jamais."
✓ "Le pire moment pour se lancer, c'est quand tu te sens prêt."

═══ CE QUI ARRÊTE VRAIMENT LE POUCE ═══

Une accroche qui constate ne retient personne. Une accroche qui DÉRANGE retient.
Le scroll s'arrête quand le cerveau détecte une menace pour l'image de soi, une accusation, ou une information qu'on aurait dû avoir et qu'on n'a pas.

Compare :
✗ "3 raisons qui expliquent tes 94 vues" → constat neutre, on scrolle
✓ "Tes 94 vues, c'est pas l'algorithme. C'est toi." → accusation, ça pique

✗ "Publier plus souvent ne changera rien" → information tiède
✓ "Tu peux poster 100 vidéos. Tu feras 100 fois 200 vues." → prédiction brutale

✗ "Les 3 premières secondes sont importantes" → évidence
✓ "Personne ne dépasse ta 2e seconde. Personne." → verdict sec

LES QUATRE LEVIERS D'IMPACT :

1. L'ACCUSATION DIRECTE
Tu désignes le spectateur comme responsable. Il se défend mentalement, donc il reste.
"C'est toi le problème, pas l'algorithme."
"Tu fais ça depuis le début et tu ne le sais pas."

2. LA PRÉDICTION QUI ENFERME
Tu annonces son futur s'il ne change rien. Il veut savoir s'il peut y échapper.
"Dans 6 mois tu seras exactement au même point."
"Tu vas abandonner dans 3 semaines. Comme les autres."

3. LE VERDICT SANS APPEL
Une phrase courte, définitive, sans nuance. Le cerveau déteste rester sur un verdict non expliqué.
"Ton contenu est bon. Ça ne suffira jamais."
"Ce n'est pas une question de travail."

4. LE SECRET RETENU
Tu affirmes que quelque chose lui est caché. La perte d'information est plus douloureuse que l'absence de gain.
"Ce que les gros comptes ne t'expliqueront jamais."
"On te fait croire l'inverse depuis le début."

RÈGLE DE TENSION :
Chaque accroche doit provoquer une des trois réactions suivantes chez le spectateur :
- "Attends, quoi ?" (surprise)
- "Non mais c'est pas vrai" (contestation)
- "Merde, c'est moi ça" (reconnaissance gênante)

Si elle ne provoque aucune des trois, elle est trop molle. Réécris-la.

RYTHME :
Les phrases courtes frappent plus fort que les longues. Deux phrases sèches battent une phrase construite.
"Tu postes. Personne ne regarde. Voilà pourquoi." bat "Voici les raisons pour lesquelles tes vidéos ne génèrent pas d'engagement."

═══ IL DOIT SAVOIR OÙ IL MET LES PIEDS ═══

Déranger ne suffit pas. En lisant l'accroche, le spectateur doit comprendre immédiatement deux choses, même sans y penser consciemment :

1. DE QUOI PARLE LA VIDÉO
Le sujet doit être lisible dans l'accroche elle-même. Pas de mystère total.

2. CE QU'IL GAGNE À RESTER
Il doit sentir qu'il repartira avec quelque chose d'utilisable.

Une accroche qui dérange mais dont on ne sait pas de quoi elle parle fait scroller aussi vite qu'une accroche molle. Le cerveau écarte ce qu'il ne peut pas classer.

Compare :
✗ "C'est toi le problème" → ça pique, mais problème de quoi ? On ne sait pas. Scroll.
✓ "Tes vidéos ne décollent pas. C'est pas l'algo, c'est toi." → même impact, et on sait de quoi il s'agit.

✗ "Personne ne te l'a jamais dit" → intrigant mais vide. Aucun sujet identifiable.
✓ "Personne ne t'a dit pourquoi tes vidéos plafonnent à 200 vues." → même curiosité, sujet clair.

✗ "Tu vas abandonner dans 3 semaines" → menace sans objet.
✓ "Tu vas abandonner tes vidéos dans 3 semaines. Voilà comment l'éviter." → menace + bénéfice.

LA FORMULE QUI MARCHE :
Impact + sujet identifiable + promesse implicite de solution.

Souvent, deux phrases courtes suffisent : la première frappe, la seconde situe.
"Tes 94 vues ne viennent pas de l'algorithme. Elles viennent de 3 erreurs."

Le bénéfice n'a pas besoin d'être annoncé explicitement. S'il comprend que tu as identifié un problème précis qui est le sien, il en déduit tout seul que tu as la réponse.

═══ MAIS RESTE HONNÊTE ═══

Dérange sans mentir. L'accroche doit être tenue par la vidéo.
Pas de fausse urgence, pas de menace inventée, pas de chiffre sorti de nulle part.
Une accroche brutale mais vraie crée de la confiance. Une accroche brutale et creuse détruit un compte.

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

Relis-la seule, sans le sujet. Sept questions :
1. Le public visé se sent-il concerné ? Si un public précis est nommé dans le sujet, l'accroche doit évoquer sa situation ou son vocabulaire.
2. Correspond-elle à la SITUATION du spectateur (pas commencé / commencé sans succès / marche déjà) ? Si elle lui prête une expérience qu'il n'a pas, jette-la et réécris.
3. Provoque-t-elle "attends quoi ?", "non c'est pas vrai" ou "merde c'est moi" ? Si aucune des trois, elle est trop molle.
4. En la lisant seule, sait-on DE QUOI parle la vidéo ? Si le sujet n'est pas identifiable, ajoute l'élément concret qui situe.
5. Le spectateur devine-t-il ce qu'il gagne à rester ?
6. Peut-on la comprendre de travers ? Si oui, réécris plus simple.
7. Si le sujet annonce un nombre, l'accroche le respecte-t-elle ?

Puis relis les 12 ensemble :
- Si plusieurs disent la même chose autrement, remplace-les par d'autres angles.
- Vérifie qu'au moins la moitié utilise l'accusation directe ou le verdict sec.
- Vérifie qu'au moins la moitié évoque explicitement la situation du public visé.

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
