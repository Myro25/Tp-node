const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Vérification de l'email existant
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, username, password: hashedPassword });

        res.status(201).json({ message: 'Utilisateur créé', user });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l’inscription' });
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user || !(bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Identifiants incorrects' });
        }
        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: '1h' })
        res.json({ message: 'Connexion réussie', token });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
}