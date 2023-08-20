const emailTransporter = require('../emailTransporter')

module.exports.paymentFailed = async ({email, paymentInfo}, res) => {
    const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: "DO NOT REPLY: Your Admattic payment failed",
        html: `
                 <p>THIS IS AN AUTO GENERATED MAIL. DO NOT REPLY!!</p>
            `
    }
    try {
        await emailTransporter.sendMail(mailOptions)
        return res.status(200).send({
            status: true,
            message: `Payment failed information sent to ${email}`,
        })
    } catch (error) {
        res.send(error.message)
    }
}