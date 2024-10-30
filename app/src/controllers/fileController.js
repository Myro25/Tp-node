const File = require('../models/File.model');
const User = require('../models/User.model');
const generateLink = require('../utils/generateLink');
const multer = require('multer');
const path = require('path');

//configuration de multer pour stocker les fichiers temporairement
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // renomme le fichiers avec le timetemps
    }
});

const upload = multer({ storage });

// fonction pour uploader un fichier
exports.uploadFile = [
    upload.single('file'),
    async (req, res) => {
        try {
            const file = req.file;
            const user = await User.findByPk(req.user.id);

            const usedQuota = await File.sum('size', { where: { user_id: req.user.id } });
            if (usedQuota + file.size > user.quota) {
                return res.status(400).json({ error: 'Quota dépassé' });
            }
            // Enregistrer le fichier dans la base de données
            const Newfile = await File.create({
                filename: file.originalname,
                path: file.path,
                size: file.size,
                user_id: req.user.id,
                metadata: {
                    mimetype: file.mimetype,
                    encoding: file.encoding
                }
            });

            res.status(201).json({ message: 'Fichier uploadé avec succés', file: newfile });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de l\'upload du fichier' });
        }


];

exports.deletefile = async (req, res, next) => {
    try {
        const fileId = req.params.id;
        const file = await File.findOne({ where: { id: fileId, user_id: req.user.id } });
        if (!file) {
            return res.status(404).json({ error: 'Fichier non trouvé' });
        }

        const fs = require('fs');
        fs.unlinkSync(file.path);


        await file.destroy();
        res.json({ message: 'Fichier supprimé avec succés' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur de suppression du fichier' });
    }
}


exports.generateLink = async (req, res, next) => {
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
}