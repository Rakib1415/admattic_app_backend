const bcrypt = require('bcrypt');
const { OTP } = require('../otp/otp.model');
const { User } = require('../user/user.model');
const { emailOTP } = require('../helper/email/options/otpEmail');

module.exports.sendOTP = async (req, res) => {
    try {
        const email = req.body.email;
        // create otp
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);

        const otpExists = await OTP.findOne({ email });
        const userExists = await User.findOne({ email });
        //console.log(otpExists, userExists, req.body.email, 'otp user ');
        console.log(otpExists, 'otp exists');

        if (otpExists != null) {
            // it means here email and otp both exists : update the otp here and send email again
            await OTP.updateMany(
                { email },
                {
                    $set: {
                        otp: hashedOTP,
                        createdAt: Date.now(),
                        expiresAt: Date.now() + 300000
                    }
                }
            );

            // check to see if user exist. if it is than modification needed later on
            // need to send user updated otp now
            emailOTP({ email, otp });

            if (userExists) {
                if (userExists.verified) {
                    return res.json({
                        message: 'User already verified , you can register now !'
                    });
                }
                if (userExists.registered) {
                    return res.json({
                        message: 'User already registered , No need to send OTP!'
                    });
                }
                return res.json({
                    message: 'Otp send again to your email , check it now !'
                });
            } else {
                let user = new User({ email });
                user.otpSentAt = Date.now();
                await user.save();
                emailOTP({ email, otp });
            }
        } else {
            const newOTPVerification = new OTP({
                email: email,
                otp: hashedOTP,
                createdAt: Date.now(),
                expiresAt: Date.now() + 300000
            });
            await newOTPVerification.save();

            let user = new User({ email });
            user.otpSentAt = Date.now();
            console.log(user, 'user saved here ');
            await user.save();
            console.log(user, 'user saved database ');

            emailOTP({ email, otp });

            return res.status(200).send('OTP send to the email');
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
};

module.exports.verifyOTP = async (req, res) => {
    console.log(1);
    try {
        const email = req.body.email;
        const otpUser = req.body.otp;
        console.log(email);
        let emailUser = await User.findOne({ email });
        if (emailUser) {
            if (emailUser.registered) {
                return res.status(200).send({
                    status: false,
                    message: 'User already registered '
                });
            }
            if (emailUser.verified) {
                return res.status(200).send({
                    status: false,
                    message: 'User already verified '
                });
            }
        }

        if (!email || !otpUser) {
            return res.status(400).send({
                status: false,
                message: 'OTP and email is required'
            });
        } else {
            const userOTPVerificationRecords = await OTP.findOne({ email });

            if (!userOTPVerificationRecords) {
                return res.status(400).send({
                    status: false,
                    message: 'Please sign in or request for OTP again to continue.'
                });
            } else {
                const { expiresAt, otp: hashOTP } = userOTPVerificationRecords;
                console.log(hashOTP);

                // check the time first
                if (expiresAt < Date.now()) {
                    await OTP.deleteMany({ email });
                    return res.status(400).send({
                        status: false,
                        message: 'OTP has expired. Please request for OTP again.'
                    });
                } else {
                    const validOTP = await bcrypt.compare(otpUser, hashOTP);
                    console.log(validOTP);
                    if (!validOTP)
                        return res.status(400).send({ status: false, message: 'Invalid OTP' });
                    // now otp is valid
                    let user = await User.findOne({ email });

                    if (user) {
                        await User.updateMany(
                            { email },
                            {
                                $set: {
                                    verified: true,
                                    verifiedAt: Date.now()
                                }
                            }
                        );
                        // const { otpSentAt } = user.otpSentAt;
                        // const { verified } = user.verified;

                        // attention needed at otpSentAt
                        // if (otpSentAt + 300000 < Date.now()) {
                        //     if (!verified) await User.deleteMany({ email });
                        //     return res.status(400).send({
                        //         status: 'false',
                        //         message: 'User session expried ! Please register again.'
                        //     });
                        // }
                        // need to track otpSent time to verify if OTP sent recently or not

                        // user.verified = true;
                        // user.verifiedAt = Date.now();
                        // const result = await user.save();

                        // delete the otp across the user

                        await OTP.deleteMany({ email });

                        return res.status(201).send({
                            status: true,
                            message: 'Email verified successfully!'
                        });
                    }
                    return res.status(200).send({
                        status: true,
                        message: 'User does not exists!'
                    });
                }
            }
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
};

module.exports.justVerifyOTP = async (req, res) => {
    //console.log(1);
    try {
        const email = req.body.email;
        const otpUser = req.body.otp;
        console.log(email);
        let emailUser = await User.findOne({ email });
        if (emailUser) {
            if (!emailUser.registered) {
                return res.status(200).send({
                    status: false,
                    message: 'First register your account '
                });
            }
            if (!emailUser.verified) {
                return res.status(200).send({
                    status: false,
                    message: 'User  should be verified first '
                });
            }
        }

        if (!email || !otpUser) {
            return res.status(400).send({
                status: false,
                message: 'OTP or email is required'
            });
        } else {
            const userOTPVerificationRecords = await OTP.findOne({ email });

            if (!userOTPVerificationRecords) {
                return res.status(400).send({
                    status: false,
                    message: 'Please request for OTP again ! OTP not found '
                });
            } else {
                const { expiresAt, otp: hashOTP } = userOTPVerificationRecords;
                console.log(hashOTP);

                // check the time first
                if (expiresAt < Date.now()) {
                    await OTP.deleteMany({ email });
                    return res.status(400).send({
                        status: false,
                        message: 'OTP has expired. Please request for OTP again.'
                    });
                } else {
                    const validOTP = await bcrypt.compare(otpUser, hashOTP);
                    console.log(validOTP);
                    if (!validOTP)
                        return res.status(400).send({ status: false, message: 'Invalid OTP' });
                    // now otp is valid now !

                    await OTP.deleteMany({ email });
                    return res.json({
                        status: true,
                        message: 'otp verified success !'
                    });
                }
            }
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
};

module.exports.justSendOTP = async (req, res) => {
    try {
        const email = req.body.email;
        // create otp
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);

        const otpExists = await OTP.findOne({ email });
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.json({
                status: false,
                message: 'User not found !'
            });
        }
        //console.log(otpExists, userExists, req.body.email, 'otp user ');
        console.log(otpExists, 'otp exists');
        if (userExists.registered && userExists.verified) {
            if (otpExists != null) {
                // it means here email and otp both exists : update the otp here and send email again
                await OTP.updateMany(
                    { email },
                    {
                        $set: {
                            otp: hashedOTP,
                            createdAt: Date.now(),
                            expiresAt: Date.now() + 300000
                        }
                    }
                );

                emailOTP({ email, otp });
                return res.json({
                    status: true,
                    message: 'Otp sent to your email'
                });
            } else {
                const newOTPVerification = new OTP({
                    email: email,
                    otp: hashedOTP,
                    createdAt: Date.now(),
                    expiresAt: Date.now() + 300000
                });
                await newOTPVerification.save();
                emailOTP({ email, otp });
                return res.status(200).send('OTP sent to the email');
            }
        } else {
            return res.status(403).send({
                status: false,
                message: 'user is not registered or verified !'
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
};
