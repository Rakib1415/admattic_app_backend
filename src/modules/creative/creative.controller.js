const { Creative } = require('../creative/creative.model');

const updateStatusCreative = async (req, res, next) => {
    try {
        const { status, creativeId } = req.body;
        if (!status || !creativeId) {
            return res
                .json({
                    message: 'Status or campaign id not found ! ',
                    status: false
                })
                .status(200);
        }
        const update = await Creative.updateOne({ _id: creativeId }, { $set: { status } });
        console.log(update);
        res.json({
            message: update,
            status: true
        });
    } catch (err) {
        res.json({
            message: err.message,
            status: false
        }).status(500);
    }
};

module.exports = {
    updateStatusCreative
};
