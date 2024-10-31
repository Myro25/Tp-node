const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const auth = require('../middlewares/auth');
const checkQuota = require('../middlewares/checkQuota');

// Route pour uploader un fichier
router.post('/upload', auth, checkQuota, fileController.uploadFile);
router.get('/', auth, fileController.getUploadedFiles);
router.delete('/:id', auth, fileController.deleteFile);
router.get('/share/:id', auth, fileController.generateLink);


module.exports = router;
