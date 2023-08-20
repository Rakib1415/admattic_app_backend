const router = require('express').Router();
const { sendOTP, verifyOTP } = require('../otp/otp.controller');

router.route('/getOTP').post(sendOTP);

router.route('/verifyOTP').post(verifyOTP);

module.exports = router;
