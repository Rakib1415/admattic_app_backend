const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../user/user.model');
const { sendLinkEmail } = require('../helper/email/options/verifyEmail');
const { emailPassword } = require('../helper/email/options/passwordEmail');

const registerUser = async (req, res) => {
    try {
        let name = req.body.name;
        let country = req.body.country;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;
        console.log(req.body);

        let user = await User.findOne({ email: req.body.email });
        console.log(1);

        if (user) {
            if (!user.verified) {
                return res.status(400).send({
                    status: false,
                    message: 'Please verify your email first'
                });
            } else if (user.registered) {
                return res.status(200).send({
                    status: false,
                    message: 'User already registered!'
                });
            } else {
                console.log(user);
                user.name = name;
                user.country = country;
                user.registered = true;

                if (password != confirmPassword)
                    return res.status(400).send({
                        status: false,
                        message: 'Confirm password is not matching with the password'
                    });

                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
                const token = user.generateJWT();
                await user.save();
                // res.set('token', token); // set token to the header

                return res.status(201).send({
                    status: true,
                    message: 'User registered successfully!',
                    token
                });
            }
        } else {
            return res.status(400).send({
                status: false,
                message: 'Please verify your email first'
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const loginUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    console.log('USer', req.body.email);
    if (!user) {
        return res.status(400).send({
            status: false,
            message: 'User not found'
        });
    } else {
        if (user.registered) {
            const validUser = await bcrypt.compare(req.body.password, user.password);
            if (!validUser)
                return res.status(200).send({
                    status: false,
                    message: 'Please enter correct password'
                });
            const token = user.generateJWT();
            //res.set('token', token); // set token to the header
            return res.status(200).send({
                status: true,
                message: 'Sign in Successfull !',
                user,
                token
            });
        } else {
            return res.status(400).send({
                status: false,
                message: 'Please register your account !'
            });
        }
    }
};

const resetPasswordGetEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        //console.log(typeof user);
        if (!user) {
            return res.json({ message: 'user not exist' }).status(403);
        }
        if (user?.registered) {
            sendLinkEmail({ email });
            return res
                .json({
                    message: 'Reset password link already sent to your email '
                })
                .status(200);
        } else {
            return res.sendStatus(401);
        }
    } catch (err) {
        return res
            .json({
                message: err.message
            })
            .status(500);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { password, confirmPassword, confirmNewPassword, email } = req.body;
        if (confirmNewPassword !== confirmPassword) {
            return res
                .json({ message: 'Password and ConfirmPassword did not matched !' })
                .status(200);
        }
        const userDB = await User.findOne({ email });
        console.log(userDB);
        if (!userDB) {
            return res.json({ message: 'UnAuthorized' }).status(403);
        }
        if (bcrypt.compareSync(password, userDB.password)) {
            console.log(confirmNewPassword, confirmPassword);
            await User.updateOne(
                { email },
                { $set: { password: bcrypt.hashSync(confirmPassword, 10) } }
            );
            return res.json({ message: 'Password reset successful' }).status(200);
        } else {
            console.log('un');
            return res.json({ message: 'Unauthorized' }).status(401);
        }
    } catch (err) {
        res.send({ message: err.message }).status(500);
    }
};

const forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res
                .json({
                    message: 'User not found'
                })
                .status(401);
        }
        // create a password random
        let password = '';
        for (let i = 0; i < 8; i++) {
            password += Math.floor(Math.random() * 10);
        }
        // send it to the email
        emailPassword({ email, password });
        // update the password also to the DB
        await User.updateOne({ email }, { $set: { password: bcrypt.hashSync(password, 10) } });
        return res.json({
            message: 'Check Your email and follow the instruction of the email also'
        });
    } catch (err) {
        return res.send({ message: err.message }).status(500);
    }
};

module.exports = {
    registerUser,
    loginUser,
    resetPasswordGetEmail,
    resetPassword,
    forgetPassword
};
