const { User } = require('../user/user.model');
const { BankFund } = require('./bankFund.model');

const { CardFund } = require('./cardFund.model');

const addCardFund = async (req, res, next) => {
    try {
        const { cost, cardId, status, tokenId } = req.body;
        const userId = req.tokenPayload._id;
        const cardFund = new CardFund({ cost, cardId, status, tokenId, userId });
        await cardFund.save();
        // need to add it to user fund
        const user = await User.findById(userId);
        const prevFund = user.fund;

        await User.updateOne({ _id: userId }, { $set: { fund: prevFund + cost } });

        return res.json({
            message: 'Payment successful ',
            status: true
        });
    } catch ({ message }) {
        return res.json({
            status: false,
            message
        });
    }
};
const addBankFund = async (req, res, next) => {
    try {
        const cheque = req.files.cheque[0].filename;
        console.log(cheque, '------------------------------------');
        if (!cheque) {
            return res.json({
                message: 'insufficient bank credentials ',
                status: false
            });
        }

        let finalData = {
            cheque,

            userId: req.tokenPayload._id,
            status: 'Pending'
        };
        console.log(finalData);

        const bankPayment = new BankFund({ ...finalData });
        await bankPayment.save();

        return res.json({
            message: 'bank transfer done , waiting for admin approval',
            status: true
        });
    } catch ({ message }) {
        return res
            .json({
                message,
                status: false
            })
            .status(500);
    }
};

module.exports = {
    addCardFund,
    addBankFund
};
