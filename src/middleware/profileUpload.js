const multer = require('multer');
const path = require('path');

let UPLOAD_FOLDER = './public';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        if (file.fieldname === 'profile') {
            let uploadFolder = `${UPLOAD_FOLDER}/profile`;
            if (file.mimetype.startsWith('image/')) {
                cb(null, uploadFolder, { fileSize: 5000000 });
            } else {
                cb(new Error('Unsupported file type image'));
            }
        } else {
            cb(new Error('Unsupported fieldName '));
        }
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName =
            file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-') +
            '-' +
            Date.now();

        cb(null, fileName + fileExt);
    }
});

const profileUpload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000 // 5mb
    }
});

module.exports = {
    profileUpload
};
