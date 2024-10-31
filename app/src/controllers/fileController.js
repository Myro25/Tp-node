const File = require('../models/File.model');
const User = require('../models/User.model');
const generateLink = require('../utils/generateLink');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // Utilisation de fs.promises pour les opérations asynchrones

// Configuration de multer pour stocker les fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Chemin absolu vers le dossier d'uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier avec un timestamp
    }
});

// Validation des fichiers uploadés
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Types de fichiers autorisés
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Type de fichier non autorisé'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
});

// Fonction pour uploader un fichier
exports.uploadFile = [
    upload.single('file'), // Utilise le nom 'file' pour multer
    async (req, res) => {
        try {
            const file = req.file;
            const user = await User.findByPk(req.user.id); // Récupérer l'utilisateur connecté

            const usedQuota = await File.sum('size', { where: { user_id: req.user.id } });
            if (usedQuota + file.size > user.quota) {
                return res.status(400).json({ error: 'Quota dépassé' });
            }

            // Enregistrer le fichier dans la base de données
            const newFile = await File.create({
                filename: file.originalname,
                path: file.path,
                size: file.size,
                user_id: req.user.id, // Utilisateur qui a uploadé le fichier
                metadata: {
                    mimetype: file.mimetype,
                    encoding: file.encoding
                }
            });

            // Générer un lien de partage
            const link = generateLink(newFile.id, req.user.id);
            res.status(201).json({ message: 'Fichier uploadé avec succès', file: newFile, link });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de l\'upload du fichier' });
        }
    }
];

// Fonction pour récupérer tous les fichiers uploadés par un utilisateur
exports.getUploadedFiles = async (req, res) => {
    try {
        const userId = req.user.id; // Récupérer l'ID de l'utilisateur connecté
        const files = await File.findAll({ where: { user_id: userId } }); // Récupérer les fichiers de l'utilisateur

        res.json(files); // Renvoyer les fichiers sous forme de JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des fichiers' });
    }
};


// Fonction pour supprimer un fichier
exports.deleteFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await File.findOne({ where: { id: fileId, user_id: req.user.id } });
        if (!file) {
            return res.status(404).json({ error: 'Fichier non trouvé' });
        }

        // Supprimer le fichier du système de fichiers
        await fs.unlink(file.path); // Utilise fs.promises.unlink pour éviter le blocage

        await file.destroy();
        res.json({ message: 'Fichier supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur de suppression du fichier' });
    }
};

// Fonction pour générer un lien de partage
exports.generateLink = async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await File.findOne({ where: { id: fileId, user_id: req.user.id } });

        if (!file) {
            return res.status(404).json({ error: 'Fichier non trouvé' });
        }
        const link = generateLink(file.id, req.user.id);
        res.json({ link });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la génération du lien de partage' });
    }
};
