const emailTransporter = require('../emailTransporter');
// http://161.35.105.125/resetPassword 
const emailPassword = async ({ email, password }) => {
    const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: 'DO NOT REPLY: Verify your email with Admattic',
        html: `
                <p>This is your temporary password<strong> ${password} </strong> </p>
                <p>Login in with this password now </strong>
                
                NB: Reset your password through link
                http://localhost:3000/reset-password
            `
    };
    try {
        await emailTransporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error.message, 'node mailer error !');
    }
};

module.exports = {
    emailPassword
};
