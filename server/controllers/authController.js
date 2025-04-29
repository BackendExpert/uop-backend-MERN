const nodemailer = require('nodemailer');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const UserActivity = require('../models/UserActivity');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const authController = {
    signup: async( req, res) => {
        try{
            const {
                username,
                email,
                password,
                faculty
            } = req.body

            const emailPattern = /^[a-zA-Z0-9._%+-]+@pdn\.ac\.lk$/;
            if (!emailPattern.test(email)) {
                return res.json({ Error: "Email must end with @pdn.ac.lk" });
            }

            if (password.length < 6) {
                return res.json({ Error: "Password must be at least 6 characters" });
            }

            const checkuser = await User.findOne({
                $or: [
                    { username: username },
                    { email: email },
                ]
            })

            if(checkuser){
                return res.json({ Error: "User Already Exists"})
            }

            const hashpass = await bcrypt.hash(password, 10)

            const newuser = new User({
                username: username,
                email: email,
                password: hashpass,
                faculty: faculty
            })

            const resnewuser = await newuser.save()

            if(resnewuser){
                const newactvitiy = new UserActivity({
                    email: email,
                    activity: 'User Registaion'
                })
                const reusltnewact = await newactvitiy.save()

                if(reusltnewact){
                    return res.json({ Status: "Success", Message: "Regisataion Successful.., Please wait for your account to be activated by the administrator."})
                }
                else{
                    return res.json({ Error: "Internal Server Error"})
                }

            }   
            else{
                return res.json({ Error: "Internal Server Error"})
            }
        }
        catch(err){
            console.log(err)
        }
    },

    singin: async(req, res) => {
        try{
            const {
                email,
                password
            } = req.body

            const checkuser = await User.findOne({ email: email })

            if(!checkuser){
                return res.json({ Error: "No User Found by Given Email Address.., Please check the Email"})
            }

            const checkpass = await bcrypt.compare(password, checkuser.password)

            if(checkpass){
                return res.json({ Error: "Password Not Match..."})
            }

            if(checkuser.isActive === false){
                return res.json({ Error: "Account is Not Active"})
            }

            const createAct = new UserActivity({
                email: email,
                activity: 'User Login'
            })

            const reusltnewact = await createAct.save()

            if(reusltnewact){
                const token = jwt.sign({ id: checkuser._id, role: checkuser.role, user: checkuser }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json({ Status: "Success", Message: "Login Success", Result: checkuser, Token: token })
            }
            else{
                return res.json({ Error: "Internal Server Error"})
            }
        }
        catch(err){
            console.log(err)
        }
    }

    
};

module.exports = authController;    