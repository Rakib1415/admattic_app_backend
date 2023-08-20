const _ = require('lodash');
const { Ads } = require('./adsGroup.model');
const { Campaign } = require('../campaign/campaign.model');
const { Creative } = require('../creative/creative.model');

const createAdGroup = async (req, res, next) => {
    try {
        //console.log(req.files, req.body);
        const { budget, campaignId, focusOn, targetCost, headings, descriptions, name } = req.body;
        let avatar = req.files.avatar.map(async (ele) => {
            let f = ele.filename;
            let name = f.split('.')[0];
            let src = f;
            const img = new Creative({ name, src });
            const dbImg = await img.save();

            return dbImg._id;
        });
        let htmlId = req.files.html.map(async (ele) => {
            let f = ele.filename;
            let name = f.split('.')[0];
            let src = f;
            const html = new Creative({ name, src });
            const htmldb = await html.save();

            return htmldb._id;
        });
        let videosId = req.files.video.map(async (ele) => {
            let f = ele.filename;
            let name = f.split('.')[0];
            let src = f;
            const videoId = new Creative({ name, src });
            const videoDB = await videoId.save();

            return videoDB._id;
        });
        // resolve the promise here
        const avatarIds = await Promise.all(avatar);
        const htmlIds = await Promise.all(htmlId);
        const videosID = await Promise.all(videosId);

        //let htmlFiles = req.files.html.map((ele) => ele.filename);

        //let videos = req.files.video.map((ele) => ele.filename);
        let finalData = {
            images: avatarIds,
            htmlFiles: htmlIds,
            videos: videosID,
            budget,
            campaignId,
            focusOn,
            targetCost,
            headings,
            descriptions,
            name
        };
        console.log(finalData);

        const ads = new Ads({ ...finalData });
        await ads.save();
        // need to push it to campaign
        await Campaign.updateOne({ _id: campaignId }, { $push: { ads: ads._id } });

        res.json({
            message: 'add ads successful',
            status: true,
            data: ads
        }).status(201);
    } catch ({ message }) {
        return res
            .json({
                message,
                status: false
            })
            .status(500);
    }
};

const updateAdsName = async (req, res) => {
    try {
        const { adsId, name } = req.body;
        if (!adsId) {
            return res
                .json({
                    message: 'adsId not found !',
                    status: false
                })
                .status(200);
        }

        const ads = await Ads.updateOne({ _id: adsId }, { $set: { name } });
        console.log(ads);
        return res
            .json({
                message: 'Ads updated success',
                status: true,
                data: ads
            })
            .status(200);
    } catch ({ message }) {
        return res
            .json({
                message,
                status: false
            })
            .status(500);
    }
};

const updateAdsStatus = async (req, res) => {
    try {
        const { adsId, status } = req.body;
        if (!adsId) {
            return res
                .json({
                    message: 'adsId not found !',
                    status: false
                })
                .status(200);
        }

        const ads = await Ads.updateOne({ _id: adsId }, { $set: { status } });
        console.log(ads);
        return res
            .json({
                message: 'Ads updated success',
                status: true,
                data: ads
            })
            .status(200);
    } catch ({ message }) {
        return res
            .json({
                message,
                status: false
            })
            .status(500);
    }
};

const getAd = async (req, res) => {
    try {
        const { adId } = req.query;
        if (!adId) {
            return res
                .json({
                    message: 'adsId not found !',
                    status: false
                })
                .status(200);
        }

        const ad = await Ads.findById(adId).populate(['images', 'videos', 'htmlFiles']);
        console.log(ad);
        return res
            .json({
                message: 'Ad group found ',
                status: true,
                data: ad
            })
            .status(200);
    } catch ({ message }) {
        return res
            .json({
                message,
                status: false
            })
            .status(500);
    }
};

module.exports = {
    createAdGroup,
    updateAdsName,
    updateAdsStatus,
    getAd
};
