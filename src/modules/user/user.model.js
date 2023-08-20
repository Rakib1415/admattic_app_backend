const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = Schema(
    {
        name: {
            type: String
        },
        country: {
            type: String
        },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 150,
            unique: true
        },
        phone: {
            type: String
        },
        password: {
            type: String,
            minlength: 8,
            maxlength: 100
        },
        terms: {
            type: Boolean
        },
        companyName: {
            type: String
        },
        taxId: {
            type: String
        },
        image: {
            type: String
        },
        verified: {
            type: Boolean,
            default: false
        },
        registered: {
            type: Boolean,
            default: false
        },
        otpSentAt: {
            type: Date
        },
        verifiedAt: {
            type: Date
        },
        credit: {
            type: Number,
            default: 0
        },
        fund: {
            type: Number,
            default: 0
        },
        lastBill: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

userSchema.methods.generateJWT = function () {
    const token = jwt.sign(
        {
            _id: this.id,
            registered: this.registered
        },
        process.env.JWT_ENCRYPTION_KEY,
        { expiresIn: '30d' }
    );

    return token;
};

module.exports.User = model('User', userSchema);
