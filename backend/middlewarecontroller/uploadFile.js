const multer = require("multer");
const uploadFile = multer
(
    {
        limits: {
            filesize: 100000
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error('Please upload a image'))
            } else {
                cb(undefined, true)
            }
        }
    }
);

module.exports = uploadFile;