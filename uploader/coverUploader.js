const multer = require('multer');
const path = require('path');
const fs = require('fs');
var slugify = require('slugify');
const moment = require('moment');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const MonthtimeStamp = moment().format('MM');
    const yeartimeStamp = moment().format('YYYY');

    // console.log('time', req);
    const path = `uploads/coverimg/${yeartimeStamp}/${MonthtimeStamp}`;
    fs.mkdirSync(path, { recursive: true }, function (err) {
      callback(err);
    });
    callback(null, path);
  },

  filename: (req, file, callback) => {
    const Image_id = crypto.randomBytes(6).toString('hex');
    file.originalname = slugify(file.originalname, { lower: true });

    callback(null, Image_id + '_' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

module.exports = {
  upload: upload,
};
