module.exports = (err, req, res, next) => {
    console.log(err);
    return res.status(err.status || 500).send({
        message: err.message,
        status: err.status || 500
    });
};
