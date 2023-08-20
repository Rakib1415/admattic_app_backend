const { Schema, model, default: mongoose } = require('mongoose');

const bankSchema = Schema({
    bankName: {
        type: String
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    accountHolderName: {
        type: String
    },
    bankNumber: {
        type: String
    },
    cheque: {
        type: String
    },
    cost: {
        type: Number
    },
    status: {
        type: String
    }
});

const BankFund = model('BankFund', bankSchema);

module.exports = {
    BankFund
};
