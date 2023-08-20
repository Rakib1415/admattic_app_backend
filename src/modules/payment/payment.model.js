const { Schema, model, default: mongoose } = require('mongoose');

const paymentSchema = Schema({
    cardType: {
        type: String
    },
    operation: {
        type: String
    },
    operationType: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Received']
    },
    cost: {
        type: String
    },
    notes: {
        type: String
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

});

const Payment = model('Payment', paymentSchema);

module.exports = {
    Payment
};
