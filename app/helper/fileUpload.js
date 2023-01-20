const multer = require('multer');
const path = require('path');
const util = require('util');

const dir = '../assets/img';

const diskStorage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const fileName = file.originalname;

    const fileEkstens = path.extname(fileName);
    if (fileEkstens !== '.jpg') {
      cb(new Error('pleass upload file with extens file.jpeg'));
    }
    const timeStamps = new Date().getTime.toString();
    cb(null, `${timeStamps}-${fileName}`);
  },
});

const fileUpld = multer({
  storage: diskStorage,
  limits: {
    fileSize: 3 * 1000 * 1000,
  },
}).single('file-img');

util.promisify({ fileUpld });
const utilPromisify = util.promisify({ fileUpld });
module.exports = { utilPromisify };
