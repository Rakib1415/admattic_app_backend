const JWT = require('jsonwebtoken');
const { User } = require('../modules/user/user.model');

const checkAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        next({ message: 'token not found', status: 403 });
    } else {
        try {
            // console.log(authorization);
            const token = authorization.split(' ')[1];

            const decode = JWT.verify(token, process.env.JWT_ENCRYPTION_KEY);
            // check to database again !
            console.log(decode);

            const userDb = await User.findOne({
                $and: [{ registered: decode.registered }, { _id: decode._id }]
            });
            console.log(userDb, 'userDB');
            // if user not found in database
            if (!userDb) {
                res.status(401).send('Unauthorized 2 !');
            }

            // all ok !
            req.tokenPayload = userDb;
            //req.role = userDB.role
            console.log('all ok from checkAuth ', req.tokenPayload);
            next();
        } catch (err) {
            res.status(401).send(err.message);
        }
    }
};

module.exports = {
    checkAuth
};
