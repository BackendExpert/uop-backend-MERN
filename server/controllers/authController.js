const nodemailer = require('nodemailer');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const UserActivity = require('../models/UserActivity');
const UserOTP = require('../models/UserOTP');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const authController = {
    signup: async (req, res) => {
        try {
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

            if (checkuser) {
                return res.json({ Error: "User Already Exists" })
            }

            const hashpass = await bcrypt.hash(password, 10)

            const newuser = new User({
                username: username,
                email: email,
                password: hashpass,
                faculty: faculty
            })

            const resnewuser = await newuser.save()

            if (resnewuser) {
                const newactvitiy = new UserActivity({
                    email: email,
                    activity: 'User Registaion'
                })
                const reusltnewact = await newactvitiy.save()

                if (reusltnewact) {
                    const generateRandomCode = (length = 10) => {
                        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}';
                        let code = '';
                        for (let i = 0; i < length; i++) {
                            code += chars.charAt(Math.floor(Math.random() * chars.length));
                        }
                        return code;
                    };

                    const verificationCode = generateRandomCode();

                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: email,
                        subject: 'Pdn Account Verification Code',
                        html: `
                            <p>Dear ${username},</p>
                            <p>Thank you for registering at the University of Peradeniya system.</p>
                            <p>Your verification code is:</p>
                            <h2 style="color:#7c340c;">${verificationCode}</h2>
                            <p>Please wait until your account is activated by an administrator.</p>
                            <br>
                            <p style="color:gray;">Do not share this code with anyone.</p>
                        `,
                    };

                    const hashotp = await bcrypt.hash(verificationCode, 10)

                    const storeOTP = new UserOTP({
                        email: email,
                        otp: hashotp
                    })

                    const resultstore = await storeOTP.save()

                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            return res.json({ Error: "Registration succeeded, but failed to send verification email." });
                        } else {
                            return res.json({
                                Status: "Success",
                                Message: "Registration successful. Verification code sent to your email. Verify Email Please wait and wait for activation."
                            });
                        }
                    });

                }
                else {
                    return res.json({ Error: "Internal Server Error" })
                }

            }
            else {
                return res.json({ Error: "Internal Server Error" })
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    verifyOPT: async (req, res) => {
        try {
            const email = req.params.email

            const { otp } = req.body

            const checkuser = await User.findOne({ email: email })

            if (!checkuser) {
                return res.json({ Error: "No User Found by Givem Email Address" })
            }

            const getoptuser = await UserOTP.findOne({ email: email })

            const checkopt = await bcrypt.compare(otp, getoptuser.otp)

            if (!checkopt) {
                return res.json({ Error: "OTP Not Match Please Check the otp" })
            }
            else {
                const updateUser = await User.findOneAndUpdate(
                    { email: email },
                    { $set: { emailVerfy: true } },
                    { new: true }
                );

                if(updateUser){
                    return res.json({ Status: "Success", Message: "Your Email Verification Success, Wait for Account Aprove by Admin"})
                }
                else{
                    return res.json({ Error: "Internal Server Error while Verifing the OTP"})
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    singin: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body

            const checkuser = await User.findOne({ email: email })

            if (!checkuser) {
                return res.json({ Error: "No User Found by Given Email Address.., Please check the Email" })
            }

            const checkpass = await bcrypt.compare(password, checkuser.password)

            if (checkpass) {
                return res.json({ Error: "Password Not Match..." })
            }

            if (checkuser.isActive === false) {
                return res.json({ Error: "Account is Not Active" })
            }

            const createAct = new UserActivity({
                email: email,
                activity: 'User Login'
            })

            const reusltnewact = await createAct.save()

            if (reusltnewact) {
                const token = jwt.sign({ id: checkuser._id, role: checkuser.role, user: checkuser }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json({ Status: "Success", Message: "Login Success", Result: checkuser, Token: token })
            }
            else {
                return res.json({ Error: "Internal Server Error" })
            }
        }
        catch (err) {
            console.log(err)
        }
    }


};

module.exports = authController;    