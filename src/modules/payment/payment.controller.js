const { Bank } = require('../bank/bank.model');
const { Card } = require('../card/card.model');
const { User } = require('../user/user.model');
const { Payment } = require('./payment.model');

const addFundAndSaveCard = async (req, res, next) => {
    try {
        const {
            cardType,
            cardHolderName,
            cardNumber,
            expireDate,
            cvc,
            fund,
        } = req.body;
        if (!cardHolderName || !cardNumber || !cardType || !cvc || !expireDate) {
            return res.json({
                message: 'missed some credentials of card !',
                stats: false
            });
        }
        let cardDb = await Card.findOne({ cardNumber });
        if (!cardDb) {
            var userId = req.tokenPayload._id;
            const cardL = new Card({
                cardType,
                cardHolderName,
                cardNumber,
                expireDate,
                cvc,
                userId
            });
            cardDb = await cardL.save();
        }

        const prevFund = req.tokenPayload.found ;
        await User.updateOne({_id : userId} , {$set : {found : prevFund + fund}})

        
        
        return res.json({
            status: true,
            message: 'card payment successful and added to your fund'
        });
    } catch (err) {
        res.json({
            message: err.message,
            status: false
        }).status(500);
    }
};

// const bankTransferPayment = async (req, res, next) => {
//     try {

//     } catch (err) {
//         res.json({
//             message: err.message,
//             status: false
//         }).status(500);
//     }
// };

const getAllPaymentsUser = async (req, res, next) => {
    try {
        const userId = req.tokenPayload._id;
        const cardPay = await Payment.find({ userId: userId });
        const bankPay = await Bank.find({ userId: userId });
        res.json({
            data: [
                {
                    card: cardPay,
                    bankPay: bankPay
                }
            ],
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
    addFundAndSaveCard,
    getAllPaymentsUser
};
