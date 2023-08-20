const nodemailer = require('nodemailer');

const emailTransporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD
    }
});
const verifyTransport = emailTransporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('ready for messaging');
        console.log('success');
    }
});
module.exports = emailTransporter;
