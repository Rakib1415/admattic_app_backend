const emailTransporter = require('../emailTransporter');

module.exports.emailOTP = async ({ email, otp }) => {
    const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: 'DO NOT REPLY: Verify your email with Admattic',
        html: `
                <p>Enter <strong>${otp}</strong> in the app to verify your email address.</p>
                <p>This <strong>OTP will be expired in five minitues</strong>
                <p>THIS IS AN AUTO GENERATED MAIL. DO NOT REPLY!!</p>
            `
    };
    try {
        await emailTransporter.sendMail(mailOptions);
        // return res.status(200).send({
        //     status: true,
        //     message: `Verification OTP sent to ${email}`,
        //     data: {
        //         email,
        //         otp
        //     }
        // });
    } catch (error) {
        console.log(error.message, 'node mailer error !');
    }
};
