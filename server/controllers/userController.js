const User = require("../models/User");

const userController = {
    getallusers: async (req, res) => {
        const alluser = await User.find()

        return res.json({ Result: alluser })
    },

    active_deactive_user: async(req, res) =>{
        try{
            const userEmail = req.params.userEmail

            const checkuser = await User.findOne({ email: userEmail })

            if(!checkuser){
                return res.json({ Error: "The User Cannot find at this time..."})
            }

            const updateuserState = await User.findOneAndUpdate(
                { email: userEmail },
                [
                    { $set: { isActive: { $not: "$isActive" } } }
                ],
                { new: true }
            );

            if(updateuserState){
                return res.json({ Status: "Success", Message: "User Account Update Success"})
            }
            else{
                return res.json({ Error: "Interanl Server Error"})
            }
            
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = userController;