const { Card } = require('./card.model');

const getAllCards = async (req, res, next) => {
    try {
        console.log(req.tokenPayload, 'from controller');
        const userId = req.tokenPayload._id;

        const cards = await Card.find({ userId });
        return res.json({
            data: cards,
            status: true
        });
    } catch (err) {
        return res.json({
            message: err.message,
            status: false
        });
    }
};

const getCardById = async (req, res, next) => {
    try {
        const userId = req.tokenPayload._id;
        const { cardId } = req.body;
        const card = await Card.findOne({ _id: cardId, userId });
        if (!card) {
            return res.json({
                data: 'card not found',
                status: false
            });
        }
        return res.json({
            data: card,
            status: true
        });
    } catch (err) {
        return res.json({
            message: err.message,
            status: false
        });
    }
};

const addCard = async (req, res, next) => {
    try {
        const { cardType, cardHolderName, cardNumber, expireDate, cvc, tokenId } = req.body;
        if (!cardHolderName || !cardNumber || !cardType || !cvc || !expireDate || !tokenId) {
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
                userId,
                tokenId
            });
            cardDb = await cardL.save();
            return res.json({
                status: true,
                message: 'card added ',
                data: cardDb

                            });
        } else {
            return res.json({
                status: true,
                message: 'card  already added !',
                data: cardDb
            });
        }
    } catch (err) {
        res.json({
            message: err.message,
            status: false
        }).status(500);
    }
};

module.exports = {
    getAllCards,
    getCardById,
    addCard
};
