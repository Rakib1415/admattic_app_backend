const router = require('express').Router();
const {
    createCampaign,
    updateCampaign,
    getAllCampaignsUser,
    getCampaignById,
    editCampaign,
    getCampaignByDates,
    deleteCampaigns
} = require('./campaign.controller');
const { checkAuth } = require('../../middleware/checkAuth');

// campaign routes

router.post('/campaign', checkAuth, createCampaign);
router.put('/updateCampaignStatus', checkAuth, updateCampaign);
router.get('/getAllCampaignUser', checkAuth, getAllCampaignsUser);
router.get('/getCampaignById', checkAuth, getCampaignById);
router.put('/editCampaign', checkAuth, editCampaign);
router.post('/getCampaignDates', checkAuth, getCampaignByDates);
router.delete('/deleteCampaigns', checkAuth, deleteCampaigns);

module.exports = router;
