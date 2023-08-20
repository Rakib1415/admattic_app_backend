const { checkAuth } = require('../../middleware/checkAuth');
const { getAllCards, getCardById, addCard } = require('./card.controller');

const cardRouter = require('express').Router();

cardRouter.get('/getAllCards', checkAuth, getAllCards);
cardRouter.get('/getCardById', checkAuth, getCardById);
cardRouter.post('/saveCard', checkAuth, addCard );

module.exports = { cardRouter };
