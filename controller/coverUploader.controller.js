function upload(req, res) {
  if (req.file.filename) {
    res.status(201).json({
      success: 1,
      message: 'image Uploaded sucessfully',
      url: `${req.file.destination}/${req.file.filename}`,
    });
  } else {
    res.status(500).json({
      message: 'image Upload failed',
    });
  }
}

module.exports = {
  upload: upload,
};
