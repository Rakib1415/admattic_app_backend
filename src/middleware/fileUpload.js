const multer = require('multer');
const path = require('path');

const UPLOADS_FOLDER = './public';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        let upload_folder;
        if (file.fieldname === 'video') {
            upload_folder = `${UPLOADS_FOLDER}/videos`;

            if (file.mimetype.startsWith('video/')) {
                cb(null, upload_folder, { fileSize: 2000000 }); // Set size limit to 2 MB
            } else {
                // Unsupported file type
                cb(new Error('Unsupported file type video'));
            }
        } else if (file.fieldname === 'avatar') {
            upload_folder = `${UPLOADS_FOLDER}/images`;
            if (file.mimetype.startsWith('image/')) {
                // Set size limit to 100 kb
                cb(null, upload_folder, { fileSize: 100000 });
            } else {
                cb(new Error('Unsupported file type images'));
            }
        } else if (file.fieldname === 'html') {
            upload_folder = `${UPLOADS_FOLDER}/htmlFiles`;
            console.log('html file -------------');
            if (file.mimetype === 'text/html') {
                cb(null, upload_folder, { fileSize: 1000000 });
            } else {
                cb(new Error('Unsupported file type html file'));
            }
            //cb(null, upload_folder, { fileSize: 1000000 });
        } else {
            cb(new Error('Invalid fieldname'));
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

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000 // 5 Mb
    }
});

module.exports = upload;
