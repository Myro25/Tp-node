const User = require('../models/User.model');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email', 'quota']
        });
        if (!user) {
            return res.status(404).json({ error: 'Utilisateurs introuvable' });
        }

        res.json({ user })
    }

    catch (err) {
        console.error(error);
        res.status(500)({ error: 'Erreur lors de la recuperation du profil utilisateur' });
    }
}