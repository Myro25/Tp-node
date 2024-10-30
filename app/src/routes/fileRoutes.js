const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// Route pour uploader un fichier
router.post('/upload', fileController.uploadFile);

module.exports = router;
