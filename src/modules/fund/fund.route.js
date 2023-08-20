const { chequeUpload } = require('../../middleware/bankChequeUpload');
const { checkAuth } = require('../../middleware/checkAuth');
const { ContentTypeMiddleware } = require('../../middleware/contentTypeMiddleware');
const { addCardFund, addBankFund } = require('./fundController');

const fundRouter = require('express').Router();

fundRouter.post('/addCardFund', checkAuth, addCardFund);

// all for cheque upload for bank transfer
fundRouter.use(ContentTypeMiddleware.formData);
fundRouter.use(chequeUpload.fields([{ name: 'cheque' }]));
fundRouter.post('/addBankFund', checkAuth, addBankFund);

module.exports = {
    fundRouter
};
