const { Schema, model, default: mongoose } = require('mongoose');

const creativeSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Active', 'Paused', 'Stopped'],
            default: 'Active'
        },
        src: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports.Creative = model('Creative', creativeSchema);
