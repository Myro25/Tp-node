document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("Le formulaire de connexion n'a pas été trouvé.");
        return; // Ne continue pas si le formulaire n'est pas présent
    }

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupère les valeurs du formulaire
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Vérifie que les champs sont remplis
        if (!email || !password) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        // Crée un objet pour envoyer les données
        const userData = {
            email: email,
            password: password
        };

        try {
            // Envoi de la requête de connexion
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Envoie les données au format JSON
                },
                body: JSON.stringify(userData) // Convertit l'objet en JSON
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de la connexion');
            }

            const data = await response.json();
            alert('Connexion réussie : ' + data.message);

            // Stocke le token dans le localStorage
            localStorage.setItem("token", data.token);

            // Redirige vers la page de téléchargement après la connexion réussie
            window.location.href = 'upload.html'; // Changer ceci selon ta structure
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la connexion : ' + error.message);
        }
    });
});
