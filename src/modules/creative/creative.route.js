const { checkAuth } = require('../../middleware/checkAuth');
const { updateStatusCreative } = require('./creative.controller');

const creativeRouter = require('express').Router();

creativeRouter.put('/updateCreativeStatus', checkAuth, updateStatusCreative);

module.exports = {
    creativeRouter
};
