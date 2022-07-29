const User = require('../models/User');

const userController = {
    //GET ALL USERS
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find({},{password:0});
            res.status(200).json(user);

        } catch (err) {
            res.status(500).js(err);
        }
    },

    //DELETE USER
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json("Delete Successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = userController;