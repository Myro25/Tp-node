const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Types de fichiers autorisés
const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.user.id; // Assurez-vous que l'utilisateur est authentifié et que l'ID est disponible
        const dir = path.join(__dirname, '../uploads', userId.toString());

        // Créer le dossier si ça n'existe pas
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) return cb(err);
            cb(null, dir);
        });
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Utiliser le nom de fichier d'origine
    }
});

// Configuration de Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // Limite de 2 Go
    fileFilter: (req, file, cb) => {
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // Accepter le fichier
        } else {
            cb(new Error('Type de fichier non autorisé')); // Rejeter le fichier
        }
    }
});

// Route pour uploader le fichier
exports.uploadFile = (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json({ message: 'Fichier uploadé avec succès' });
    });
};
