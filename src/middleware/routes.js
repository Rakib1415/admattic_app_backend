const authRouter = require('../modules/auth/auth.route');
const otpRouter = require('../modules/otp/otp.route');
const campaignRouter = require('../modules/campaign/campaign.route');
const adsGroupRouter = require('../modules/ads-group/adsGroup.route');
const { userRouter } = require('../modules/user/user.route');
const { creativeRouter } = require('../modules/creative/creative.route');
const { cardRouter } = require('../modules/card/card.router');
const { adminRouterPayment } = require('../modules/adminModule/adminRouterPayment');
const { fundRouter } = require('../modules/fund/fund.route');


module.exports = (app) => {
    app.use('/auth', authRouter);

    app.use('/otp', otpRouter);

    app.use('/api', campaignRouter);
    app.use('/api', adsGroupRouter);
    app.use('/user', userRouter);
    app.use('/creative', creativeRouter);
    app.use('/card', cardRouter);
    app.use('/paymentAdmin', adminRouterPayment);
    app.use('/fund', fundRouter);
    
   

    //not found handler her ---> 404 routes
    app.use((req, res, next) => {
        const error = new Error('Not found ');
        error.status = 404;
        res.send(error);
    });

    // last error handling middleware here --------> 500 || err.message
    // app.use((req, res, next, err) => {
    //     console.log('Last middleware hit here ');
    //     res.send({ message: err.message, status: err.status || 500 });
    // });
};
