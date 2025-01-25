// src/logic/Verif.js
// Récupère 2 variables et les envoie via API sur https://api.promete-it.fr/orth
// sous forme de JSON : { value: "valeur", orth: "orthographe" }

async function Verif(value, orth) {
    try {
        // On log tout ce qui est envoyé à l'API
        const bodyToSend = { value, orth };
        console.log("[Verif] → Corps de la requête envoyé à l'API:", bodyToSend);

        const response = await fetch('https://api.promete-it.fr/orth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyToSend),
        });

        console.log("[Verif] → Statut HTTP renvoyé par l'API:", response.status);

        // Vérifie si la requête HTTP a abouti (status 2xx)
        if (!response.ok) {
            console.error("[Verif] La requête a échoué, code HTTP :", response.status);
            return {
                result: "Erreur réseau : " + response.status,
                data: null,
            };
        }

        // Récupère la réponse complète en JSON
        const data = await response.json();

        // Log de tout ce qui est reçu
        console.log("[Verif] ← Contenu JSON reçu de l'API:", data);

        // Vérifie la structure de data et le message
        if (!data || !data.message) {
            console.warn("[Verif] data.message est introuvable :", data);
            return {
                result: "Erreur : data.message introuvable",
                data: data,
            };
        }

        // Pour déboguer : afficher la chaîne exactement + sa longueur
        console.log(
            "[Verif] Chaîne message brute :", JSON.stringify(data.message),
            "| Longueur :", data.message.length
        );

        // On "nettoie" la chaîne (trim enlève les espaces autour)
        const cleanMessage = data.message.trim();

        let resultat;
        switch (cleanMessage) {
            case "Bravo vous avez trouvé la bonne orthographe":
                resultat = "et oui bébé !";
                break;
            case "Vous avez trouvé une orthographe proche":
                resultat = "yep !";
                break;
            case "Vous avez trouvé une orthographe pas assez proche":
                resultat = "ho pas loin...";
                break;
            case "Vous avez trouvé une orthographe pas proche":
                resultat = "Non c'est pas ça";
                break;
            default:
                resultat = "Erreur";
        }

        console.log("[Verif] Résultat final à retourner :", resultat);

        return {
            result: resultat,
            data: data, // data contient { message: "...", ... }
        };

    } catch (error) {
        console.error('[Verif] Erreur attrapée dans le catch:', error);
        return {
            result: "Erreur : " + error.message,
            data: null,
        };
    }
}

export default Verif;
