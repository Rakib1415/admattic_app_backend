const emailTransporter = require('../emailTransporter');

const sendLinkEmail = async ({ email }) => {
    const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: 'DO NOT REPLY: Verify your email with Admattic',
        html: `
            Hi Mike,

            We are received a request to reset your password.
            
            IF you  did not make the request , just ignore this message.
            Otherwise, you can reset your password.

            Reset your password through link
            http://161.35.105.125/resetPassword
        `
    };
    try {
        await emailTransporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error.message, 'node mailer error !');
    }
};

module.exports = {
    sendLinkEmail
};
