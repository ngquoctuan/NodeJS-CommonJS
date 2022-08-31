const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "--" + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')) {
//         cb(null, true);
//     } else {
//         cb(null, false);

//     }

// };
// const multer = require('multer');
const uploadFile = multer({
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
})

// const uploadFile = multer(
//     { storage: storage, 
//         limits: {fileSize: 1024 * 1024 * 5},
//     fileFilter: fileFilter }
// );

module.exports = uploadFile;