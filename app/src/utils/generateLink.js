const baseUrl = 'http://localhost:3000/files/download'; // URL de base pour le téléchargement

/**

 * @param {number} fileId 
 * @param {number} userId 
 * @returns {string}
 */
const generateLink = (fileId, userId) => {
    // Crée un lien unique en ajoutant l'ID du fichier et éventuellement l'ID de l'utilisateur
    return `${baseUrl}/${fileId}?user=${userId}`;
};

module.exports = generateLink;
