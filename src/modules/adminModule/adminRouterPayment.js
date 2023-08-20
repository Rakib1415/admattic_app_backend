const { checkAuth } = require('../../middleware/checkAuth');
const {
    paymentUserAdmin,
    checkBankPayment,
    deleteBankPayment,
    showAllBankFundUser,
    showAllPaymentsUser
} = require('./userPayment.controller');

const adminRouterPayment = require('express').Router();

adminRouterPayment.post('/paymentUser', checkAuth, paymentUserAdmin);
adminRouterPayment.put('/checkBankFund', checkAuth, checkBankPayment);
adminRouterPayment.delete('/deletePayment', checkAuth, deleteBankPayment);
adminRouterPayment.get('/getAllBankFundUser', checkAuth, showAllBankFundUser);
adminRouterPayment.get('/getAllUserPayments', checkAuth, showAllPaymentsUser);

module.exports = {
    adminRouterPayment
};
