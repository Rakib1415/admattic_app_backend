const { checkAuth } = require('../../middleware/checkAuth');
const { addFundAndSaveCard, getAllPaymentsUser } = require('./payment.controller');

const paymentRouter = require('express').Router();

// paymentRouter.post('/addFundAndSaveCard', checkAuth, addFundAndSaveCard);
// paymentRouter.get('/getAllPayments', checkAuth, getAllPaymentsUser);

module.exports = {
    paymentRouter
};
