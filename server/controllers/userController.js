const User = require("../models/User");

const userController = {
    getallusers: async (req, res) => {
        const alluser = await User.find()

        return res.json({ Result: alluser })
    },

    active_deactive_user: async(req, res) =>{
        try{
            const userEmail = req.params.email

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
    },

    // chage user role

    changeUserRole: async(req, res) => {
        try{
            const email = req.params.email

            const {
                role
            } = req.body

            const checkuser = await User.findOne({ email: email })

            if(!checkuser){
                return res.json({ Error: "No User Found..."})
            }

            const updateuser = await User.findOneAndUpdate(
                { email: email },
                [
                    { $set: { role: role } }
                ],
                {new: true}
            )

            if(updateuser){
                return res.json({ Status: "Success", Message: "User Updated Success"})
            }
            else{
                return res.json({ Error: "Internal Server Error While Updating User"})
            }
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = userController;