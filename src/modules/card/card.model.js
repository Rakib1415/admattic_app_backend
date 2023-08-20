const { Schema, model, default: mongoose } = require('mongoose');

const cardSchema = Schema({
    cardType: {
        type: String
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    cardHolderName: {
        type: String
    },
    cardNumber: {
        type: String
    },
    expireDate: {
        type: String
    },
    cvc: {
        type: String
    },
    tokenId: {
        type: String
    }
});

const Card = model('Card', cardSchema);

module.exports = {
    Card
};
