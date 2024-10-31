const express = require('express');
const sequelize = require('./database');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// les routes 
app.use('/auth', authRoutes)
app.use(' /files', fileRoutes)
app.use(' /users', userRoutes)


sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Serveur démarre sur le port 3000'));
}).catch(err => console.error(' Erreur de connexion a la base de données :', error));