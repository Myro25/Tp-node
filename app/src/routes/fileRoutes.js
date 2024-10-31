const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const auth = require('../middlewares/auth');
const checkQuota = require('../middlewares/checkQuota');



// Route pour uploader un fichier
router.post('/upload', auth, checkQuota, fileController.uploadFile);
router.delete('/:id', auth, fileController.deletefile);
router.get('./share/:id', auth, fileController.generateLink);


module.exports = router;
