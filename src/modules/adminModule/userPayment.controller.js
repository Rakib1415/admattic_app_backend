const { BankFund } = require('../fund/bankFund.model');
const { User } = require('../user/user.model');
const { UserPayment } = require('./userPayment.model');

const paymentUserAdmin = async (req, res, next) => {
    try {
        const { date, operation, operationType, status, cost, balance, notes, userId } = req.body;

        const userPayment = new UserPayment({
            date,
            balance,
            operation,
            operationType,
            status,
            cost,
            notes,
            userId
        });
        const userPaymentDB = await userPayment.save();
        return res.json({
            status: true,
            message: 'user payment success !'
        });
    } catch (err) {
        return res.json({
            status: false,
            message: err.message
        });
    }
};

const checkBankPayment = async (req, res, next) => {
    try {
        const { bankName, userId, accountHolderName, bankNumber, cheque, cost, status, paymentId } =
            req.body;

        const updateBankPayment = await BankFund.updateOne(
            { _id: paymentId },
            { $set: { bankName, userId, accountHolderName, bankNumber, cheque, cost, status } }
        );
        // need to update user fund amount
        const userDB = await User.findById(userId);
        const prevFund = userDB.fund;
        console.log(prevFund, '-------------------');
        await User.updateOne({ _id: userId }, { $set: { fund: prevFund + cost } });
        return res.json({
            status: true,
            message: 'check and update payment'
        });
    } catch (err) {
        return res.json({
            status: false,
            message: err.message
        });
    }
};

const deleteBankPayment = async (req, res, next) => {
    try {
        const { paymentId } = req.body;
        // const bankPayment = await BankFund.findById(paymentId);
        // const cheque = bankPayment.cheque ;
        // delete the cheque asset form the public dir
        const deleteBankPayment = await BankFund.deleteOne({ _id: paymentId });
        console.log(deleteBankPayment);

        return res.json({
            status: true,
            message: 'bankPayment Deleted'
        });
    } catch (err) {
        return res.json({
            status: false,
            message: err.message
        });
    }
};
const showAllBankFundUser = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const allPaymentBank = await BankFund.find({ userId });

        return res.json({
            status: true,
            data: allPaymentBank
        });
    } catch (err) {
        return res.json({
            status: false,
            message: err.message
        });
    }
};

const showAllPaymentsUser = async (req, res, next) => {
    try {
        const userId = req.tokenPayload._id;
        const allPaymentUser = await UserPayment.find({ userId });

        return res.json({
            status: true,
            data: allPaymentUser
        });
    } catch (err) {
        return res.json({
            status: false,
            message: err.message
        });
    }
};

module.exports = {
    deleteBankPayment,
    checkBankPayment,
    paymentUserAdmin,
    showAllBankFundUser,
    showAllPaymentsUser
};
