const express = require('express');
const fs = require('fs/promises');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const upload = multer({ dest: './uploads/' });

const User = require('../models/User');

const router = express.Router();

router.put('/avatar', upload.single('avatar'), async (req, res, next) => {
  if (!req.file) {
    const err = new Error('Invalid image file');
    err.statusCode = 400;
    next(err);
    return;
  }
  const filePath = req.file.path;
  try {
    const image = await cloudinary.uploader.upload(filePath);
    const urlArr = image.secure_url.split('/');
    urlArr
      .splice(urlArr.length - 2, 0, 'w_256,h_256,c_fill');
    const avatarUrl = urlArr.join('/');
    const [user] = await Promise.all([
      User.findByIdAndUpdate(req.user._id, { avatar: avatarUrl }, { new: true }),
      fs.unlink(filePath),
    ]);
    res.json({
      user,
    });
  } catch (err) {
    await fs.unlink(filePath);
    next(err);
  }
});

module.exports = router;
