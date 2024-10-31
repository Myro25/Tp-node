const express = require('express');
const path = require('path'); // Ajoute cette ligne
const sequelize = require('./database');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware pour analyser le corps des requêtes JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques (frontend)
app.use(express.static(path.join(__dirname, '../frontend'))); // Modifie le chemin si nécessaire

// Route pour le fichier index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html')); // Modifie le chemin si nécessaire
});

// Les routes
app.use('/auth', authRoutes);
app.use('/files', fileRoutes);
app.use('/users', userRoutes);

// Synchroniser la base de données et démarrer le serveur
sequelize.sync().then(
    () => app.listen(3000, () => console.log('Serveur démarre sur le port 3000'))
);
