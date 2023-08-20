const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    userId: String,
    email: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
})

module.exports.OTP = mongoose.model(
    "OTP",
    otpSchema
)