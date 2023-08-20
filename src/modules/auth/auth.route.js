const router = require('express').Router();

const { checkAuth } = require('../../middleware/checkAuth');
const {
    registerUser,
    loginUser,
    resetPasswordGetEmail,
    resetPassword,
    forgetPassword
} = require('../auth/auth.controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/sendLinkEmail', resetPasswordGetEmail);
router.post('/resetPassword', resetPassword);
router.post('/forgetPassword', forgetPassword);

module.exports = router;
