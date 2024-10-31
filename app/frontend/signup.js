document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupère les valeurs du formulaire
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Crée un objet pour envoyer les données
        const userData = {
            username: username,
            email: email,
            password: password
        };

        try {
            // Envoie de la requête d'inscription
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Indique que les données sont au format JSON
                },
                body: JSON.stringify(userData) // Convertit l'objet en JSON
            });

            if (!response.ok) {
                // Gestion des erreurs si la réponse n'est pas OK
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de l\'inscription');
            }

            // Récupère la réponse du serveur
            const data = await response.json();
            alert('Inscription réussie : ' + data.message);

            // Redirige vers la page de connexion ou de téléchargement
            window.location.href = 'login.html'; // Change la page selon ton besoin

        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            alert('Erreur lors de l\'inscription : ' + error.message);
        }
    });
});
