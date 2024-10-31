document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("uploadForm");
    const filesList = document.getElementById("filesList");

    // Fonction pour afficher les fichiers uploadés
    const displayUploadedFile = (file) => {
        const fileDiv = document.createElement("div");
        fileDiv.classList.add("file-item");
        fileDiv.setAttribute("data-id", file.id); // Ajoute un attribut data-id
        fileDiv.innerHTML = `
            <img src="${file.path}" alt="${file.filename}" style="width: 100px; height: auto;">
            <div>
                <p>${file.filename}</p>
                <button onclick="deleteFile(${file.id})">Supprimer</button>
                <button onclick="generateShareLink(${file.id})">Partager</button>
            </div>
        `;
        filesList.appendChild(fileDiv);
    };

    // Fonction pour supprimer un fichier
    window.deleteFile = async (fileId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:3000/files/${fileId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du fichier');
            }
            alert('Fichier supprimé avec succès');
            // Supprimer le fichier de l'affichage
            document.querySelector(`.file-item[data-id="${fileId}"]`).remove();
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la suppression : ' + error.message);
        }
    };

    // Fonction pour générer un lien de partage
    window.generateShareLink = async (fileId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:3000/files/share/${fileId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la génération du lien');
            }
            const data = await response.json();
            alert('Lien de partage : ' + data.link);
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la génération du lien : ' + error.message);
        }
    };

    uploadForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const fileUpload = document.getElementById("fileUpload").files[0];
        const formData = new FormData();
        formData.append("file", fileUpload);

        // Récupère le token de l'utilisateur depuis le localStorage
        const token = localStorage.getItem("token");

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

            // Après un upload réussi, affichez le fichier
            const uploadedFile = {
                id: data.file.id, // Assurez-vous que cela correspond à votre réponse
                filename: data.file.filename, // Assurez-vous que cela correspond à votre réponse
                path: data.file.path // Assurez-vous que cela correspond à votre réponse
            };
            displayUploadedFile(uploadedFile);
        } catch (error) {
            console.error('Erreur lors de l\'upload:', error);
            alert('Erreur lors de l\'upload : ' + error.message);
        }
    });
});
