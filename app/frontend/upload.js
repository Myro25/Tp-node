document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("uploadForm");

    uploadForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const fileUpload = document.getElementById("fileUpload").files[0];
        const formData = new FormData();
        formData.append("file", fileUpload);

        // Récupère le token de l'utilisateur depuis le localStorage (ou là où il est stocké)
        const token = localStorage.getItem("token"); // Assure-toi que le token est bien stocké sous cette clé

        if (!token) {
            alert("Utilisateur non authentifié. Veuillez vous connecter.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'upload du fichier");
            }

            const data = await response.json();
            alert('Upload réussi : ' + data.message);
        } catch (error) {
            console.error('Erreur lors de l\'upload:', error);
            alert('Erreur lors de l\'upload : ' + error.message);
        }
    });
});
