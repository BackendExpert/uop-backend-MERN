const User = require("../models/User");

const userController = {
    getallusers: async (req, res) => {
        const alluser = await User.find()

        return res.json({ Result: alluser })
    },

    active_deactive_user: async(req, res) =>{
        try{
            const userEmail = req.params.userEmail

            const checkuser = await User.findOne({ email: email })

            if(!checkuser){
                return res.json({ Error: "The User Cannot find at this time..."})
            }
            
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = userController;