const { model, Schema, default: mongoose } = require('mongoose');

const userPaymentSchema = Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: String
    },
    operation: {
        type: String
    },
    operationType: {
        type: String
    },
    status: {
        type: String
    },
    cost: {
        type: Number
    },
    balance: {
        type: Number
    },
    notes: {
        type: String
    }
});

const UserPayment = model('UserPayment', userPaymentSchema);

module.exports = {
    UserPayment
};
