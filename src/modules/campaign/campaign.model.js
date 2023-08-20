const { Schema, model, default: mongoose } = require('mongoose');

const campaignSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref : 'User'
        },
        type: {
            type: String,
            enum: ['App Install', 'App Engagement', 'App Pre-registration (Android only)']
        },
        platforms: {
            type: [String]
        },
        appName: {
            type: String
        },
        status: {
            type: String,
            enum: ['Active', 'Paused', 'Stopped'],
            default: 'Active'
        },
        location: {
            type: String
        },
        language: {
            type: String
        },

        conversionTracking: mongoose.Schema.Types.Mixed,
        ads: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ads'
            }
        ]
    },
    { timestamps: true }
);

module.exports.Campaign = model('Campaign', campaignSchema);
