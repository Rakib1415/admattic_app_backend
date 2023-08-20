const router = require('express').Router();
const { checkAuth } = require('../../middleware/checkAuth');
const { ContentTypeMiddleware } = require('../../middleware/contentTypeMiddleware');
const upload = require('../../middleware/fileUpload');
const { createAdGroup, updateAdsName, updateAdsStatus, getAd } = require('./adsGroup.controller');

// router.use('/adsGroup', upload.fields([{name : 'html'}, {name : 'avatar'}, {name:'video'}]),  (req, res, next) => {
//     res.status(200).json({
//         message : 'Hello'
//     })
// });

router.put('/updateAdsName', checkAuth, updateAdsName);
router.put('/updateAdsStatus', checkAuth, updateAdsStatus);
router.get('/getAd', checkAuth, getAd);

router.use(ContentTypeMiddleware.formData);
router.use(upload.fields([{ name: 'html' }, { name: 'avatar' }, { name: 'video' }]));
router.post('/createAd', checkAuth, createAdGroup);

module.exports = router;
