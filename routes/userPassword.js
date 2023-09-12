const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const UserModel = require('../models/UserModel');
const dotenv = require('dotenv')
dotenv.config({ path: '../config.env' })
router.post('/forgot-password', async(req, res) => {
    const { email } = req.body;
    //  console.log('Email:', email);

    try {
        const user = await UserModel.findOne({ email });
        console.log("user is", user)

        if (!user) {
            return res.status(404).json({ success: false, message: "Email does not exist" });
        }
        const token = randomstring.generate();

        user.token = token;
        await user.save();

        console.log('Sending reset password email to:', user.email);
        sendResetPasswordMail(user.username, user.email, token);

        res.status(200).json({ success: true, message: "Please check your inbox for reset instructions" });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
});

function sendResetPasswordMail(username, email, token) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    transporter.verify(function(error, success) {
        if (error) {
            console.log('Transporter verification error:', error);
        } else {
            console.log('Server is ready to send emails');
            sendEmail(email, token);

        }
    });

    const sendEmail = (email, token) => {
        const mailOptions = {
            from: 'niteshkaushik0210@gmail.com',
            to: email,
            subject: 'Email verification',
            html: `<p>Please click on the following link to verify your email address:</p>
                <a href="http://localhost:5000/verify/${token}">http://localhost:5000/verify/${token}</a>`,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('Error in sending email  ' + error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = router;