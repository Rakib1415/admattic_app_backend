const { User } = require('./user.model');
const fs = require('fs');
const bcrypt = require('bcrypt');

const updateProfile = async (req, res, next) => {
    try {
        const userDB = req.tokenPayload;
        console.log(req.files);
        console.log(req.body);
        const { name, phone, email, country, password: newPassword } = req.body;

        console.log(userDB);
        if (!userDB?.image) {
            console.log(1);
            const updateRes = await User.updateOne(
                { _id: userDB._id },
                {
                    $set: {
                        image: req.files.profile[0].filename,
                        name,
                        phone,
                        email,
                        country,
                        password: bcrypt.hashSync(newPassword, 10)
                    }
                }
            );
            return res.json({
                status: true,
                message: 'Profile updated success',
                updateResponseDB: updateRes
            });
        } else {
            const { image } = userDB;
            const updateRes = await User.updateOne(
                { _id: userDB._id },
                {
                    $set: {
                        image: req.files.profile[0].filename,
                        name,
                        phone,
                        email,
                        country,
                        password: bcrypt.hashSync(newPassword, 10)
                    }
                }
            );
            const pathImg = `./public/profile/${image}`;
            if (fs.existsSync(pathImg)) {
                fs.rmSync(pathImg);
            }

            return res.json({
                status: true,
                message: 'Profile updated success',
                updateResponse: updateRes
            });
        }
    } catch (err) {
        return res.json({
            message: err.message,
            status: false
        });
    }
};

const getUserByToken = (req, res, next) => {
    try {
        const user = req.tokenPayload;

        return res.json({
            data: user,
            status: true
        });
    } catch (err) {
        return res.json({
            message: err.message,
            status: false
        });
    }
};

module.exports = {
    updateProfile,
    getUserByToken
};
