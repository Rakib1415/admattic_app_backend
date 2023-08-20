const { Schema, model, default: mongoose } = require('mongoose');

const adsGroupSchema = Schema(
    {
        budget: {
            type: Number,
            required: true
        },
        campaignId: {
            type: mongoose.Types.ObjectId,
            ref: 'Campaign'
        },
        focusOn: {
            type: String,
            enum: ['Install volume', 'In-app actions', 'In-app actions value']
        },
        targetCost: {
            type: Number
        },
        headings: {
            type: [String]
        },
        descriptions: {
            type: [String]
        },
        images: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Creative'
            }
        ],
        videos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Creative'
            }
        ],
        htmlFiles: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Creative'
            }
        ],
        target: {
            type: String,
            enum: ['All user', 'User likely to perform on in app action']
        },
        name: {
            type: String
        },
        status: {
            type: String,
            enum: ['Active', 'Paused', 'Stopped'],
            default: 'Active'
        },
        avatars: {
            type: mongoose.Types.ObjectId,
            ref: 'Creative'
        }
    },
    { timestamps: true }
);

module.exports.Ads = model('ads', adsGroupSchema);
