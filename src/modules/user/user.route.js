const { checkAuth } = require('../../middleware/checkAuth');
const { ContentTypeMiddleware } = require('../../middleware/contentTypeMiddleware');
const { profileUpload } = require('../../middleware/profileUpload');
const { justVerifyOTP, justSendOTP } = require('../otp/otp.controller');
const { updateProfile, getUserByToken } = require('./user.controller');

const userRouter = require('express').Router();

userRouter.put(
    '/updateProfile',
    checkAuth,
    ContentTypeMiddleware.formData,
    profileUpload.fields([{ name: 'profile' }]),
    updateProfile
);

userRouter.post('/justVerifyOTP', checkAuth, justVerifyOTP);
userRouter.post('/justSendOTP', checkAuth, justSendOTP);
userRouter.get('/getUserByToken', checkAuth, getUserByToken);

module.exports = {
    userRouter
};
