const { Schema, model, default: mongoose } = require('mongoose');

const cardPaymentSchema = Schema({
    cost: {
        type: Number
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    cardId: {
        type: mongoose.Types.ObjectId,
        ref: 'Card'
    },
    status: {
        type: String
    },
    tokenId: {
        type: String
    }
});

const CardFund = model('CardFund', cardPaymentSchema);

module.exports = {
    CardFund
};
