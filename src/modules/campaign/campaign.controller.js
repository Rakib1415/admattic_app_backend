const _ = require('lodash');
const { Campaign } = require('./campaign.model');

module.exports.createCampaign = async (req, res, next) => {
    const { name, type, platforms, appName, location, language, conversionTracking } = req.body;
    let campaign = await Campaign.findOne({ name });
    if (campaign) return res.status(400).send({ message: 'Campaign by this name already exists' });

    try {
        campaign = new Campaign({
            name,
            type,
            platforms,
            appName,
            location,
            language,
            conversionTracking,
            userId: req.tokenPayload._id
        });
        await campaign.save();
        res.status(201).json({
            message: 'Added campaign successfully!',
            campaign
        });
    } catch (err) {
        next(err.message);
    }
};

module.exports.deleteCampaigns = async (req, res) => {
    const {campaignArr} = req.body;
    if(campaignArr?.length === 0){
        return res
                .json({
                    message: 'Campaign not found here !',
                    status: false
                })
                .status(200);
    }
    const _ids = campaignArr?.map((camp) => camp?._id);
    try{
        await Campaign.deleteMany({_id : {$in : _ids}});
        return res
                .json({
                    message: 'Campaign Successfully deleted !',
                    status: true
                })
                .status(200);

    }catch({message}){
        return res
            .json({
                message,
                status: false
            })
            .status(500);
    }
}

module.exports.updateCampaign = async (req, res) => {
    try {
        const { campaignArr, status } = req.body;
        if (campaignArr.length == 0 || !status) {
            return res
                .json({
                    message: 'Campaign or status not found here !',
                    status: false
                })
                .status(200);
        }
        for (let campaignId of campaignArr) {
            await Campaign.updateOne({ _id: campaignId }, { $set: { status } });
        }
        return res
            .json({
                message: 'Campaigns are updated successful !',
                status: true
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

module.exports.getAllCampaignsUser = async (req, res) => {
    try {
        const userId = req.tokenPayload._id;
        if (!userId) {
            return res
                .json({
                    message: 'UserID not found !',
                    status: false
                })
                .status(200);
        }

        const campaigns = await Campaign.find({ userId: userId }).populate('ads');
        return res
            .json({
                message: 'Campaign data found',
                status: true,
                data: campaigns
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

module.exports.getCampaignById = async (req, res) => {
    try {
        const campaignId = req.query.campaignId;
        if (!campaignId) {
            return res
                .json({
                    message: 'campaignId not found !',
                    status: false
                })
                .status(200);
        }

        const campaign = await Campaign.findById(campaignId).populate('ads'); // schema ref
        return res
            .json({
                message: 'Campaign data found',
                status: true,
                data: campaign
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

module.exports.editCampaign = async (req, res, next) => {
    const { name, type, platforms, appName, location, language, conversionTracking, campaignId } =
        req.body;

    try {
        const updateCampaign = await Campaign.updateOne(
            { _id: campaignId },
            { $set: { name, type, platforms, appName, location, language, conversionTracking } }
        );
        res.status(200).json({
            message: 'Campaign Updated successful successfully!',
            status: true,
            campaign: updateCampaign
        });
    } catch ({ message }) {
        return res
            .json({
                message,
                status: false
            })
            .status(500);
    }
};

module.exports.getCampaignByDates = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.body;
        const sdate = new Date(startDate);
        const edate = new Date(endDate);
        console.log(sdate, edate);
        const campaigns = await Campaign.find({
            userId: req.tokenPayload._id,
            createdAt: {
                $gte: sdate,
                $lte: edate
            }
        }).populate('ads');

        res.status(200).json({
            message: 'Campaigns found ',
            status: true,
            campaigns
        });
    } catch ({ message }) {
        return res
            .json({
                message,
                status: false
            })
            .status(500);
    }
};
