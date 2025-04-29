const User = require("../models/User");

const userController = {
    getallusers: async (req, res) => {
        const alluser = await User.find()

        return res.json({ Result: alluser })
    }
};

module.exports = userController;