const express = require('express');
// const { checkToken } = require('../../../auth/token_validation');
const imageController = require('../controller/coverUploader.controller');
const imageUploader = require('../uploader/coverUploader');
const router = express.Router();
router.post(
  '/cover-upload',
  imageUploader.upload.single('image'),
  imageController.upload
);

module.exports = router;
