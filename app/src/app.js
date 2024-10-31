// tourner docker
while (true) {

}



const express = require('express');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/fileRoutes');
const database = require('./database');

const app = express();
app.use(bodyParser.json());

// Utiliser les routes pour l'upload de fichiers
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

database.connect(); // Connexion à la base de données
