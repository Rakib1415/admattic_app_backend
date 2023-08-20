// const { chequeUpload } = require('../../middleware/bankChequeUpload');
// const { checkAuth } = require('../../middleware/checkAuth');
// const { ContentTypeMiddleware } = require('../../middleware/contentTypeMiddleware');
// const { makePaymentBank } = require('./bank.controller');

// const bankRouter = require('express').Router();

// // all for cheque upload for bank transfer
// bankRouter.use(ContentTypeMiddleware.formData);
// bankRouter.use(chequeUpload.fields([{ name: 'cheque' }]));
// bankRouter.post('/bankTransfer', checkAuth, makePaymentBank);

// module.exports = {
//     bankRouter
// };
