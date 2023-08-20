const multer = require('multer');
const path = require('path');

const UPLOAD_FOLDER = './public';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        if (file.fieldname === 'cheque') {
            const uploadDir = `${UPLOAD_FOLDER}/${file.fieldname}`;
            if (file.mimetype.startsWith('image/')) {
                // Set size limit to 100 kb
                cb(null, uploadDir, { fileSize: 5000000 });
            } else {
                cb(new Error('Unsupported file type images'));
            }
        } else {
            cb(new Error('Unsupported field name'));
        }
    },
    filename: (req, file, cb) => {
        const fExt = path.extname(file.originalname);
        const fileName =
            file.originalname.replace(fExt, '').toLowerCase().split(' ').join('-') +
            '-' +
            Date.now();

        cb(null, fileName + fExt);
    }
});

const chequeUpload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000
    }
});

module.exports = {
    chequeUpload
};
