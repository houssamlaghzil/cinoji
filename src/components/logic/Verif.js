export default async function Verif(value, orth) {
    try {
        const bodyToSend = { value, orth };
        console.log('bodyToSend:', bodyToSend);

        const response = await fetch('https://api.promete-it.fr/orth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyToSend),
        });

        console.log('HTTP Status:', response.status);

        if (!response.ok) {
            console.log('Erreur HTTP:', response.status);
            return "Erreur de l'API";
        }

        const data = await response.json();
        console.log('Réponse API:', data);

        // Exemple de gestion du message
        const resultat = data.message || "Réponse inattendue";
        console.log('Resultat:', resultat);

        return resultat;
    } catch (error) {
        console.error('Erreur fetch:', error);
        return "Erreur réseau ou serveur";
    }
}
