const express = require('express');
const { body, validationResult } = require('express-validator');
const fs = require('fs/promises');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const bcrypt = require('bcryptjs');

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

router.put('/profile', [
  body('firstName', 'First name must have 1 to 35 characters').trim().isLength({ min: 1, max: 35 }).escape(),
  body('lastName', 'Last name must have 1 to 35 characters').trim().isLength({ min: 1, max: 35 }).escape(),
  body('bio', 'Bio should have a maximum of 155 characters').trim().isLength({ max: 155 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // TODO handle validation errors properly
      next(errors.array());
      return;
    }
    try {
      const user = await User
        .findByIdAndUpdate(req.user._id, {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          bio: req.body.bio,
        }, { new: true });
      res.json({
        user,
      });
    } catch (err) {
      next(err);
    }
  },
]);

router.put('/password', [
  body('password')
    .trim()
    .escape()
    .custom(async (password, { req }) => {
      const user = await User.findById(req.user._id, 'password');
      const res = await bcrypt.compare(password, user.password);
      if (!res) {
        const error = new Error('Wrong password');
        error.statusCode = 401;
        throw error;
      }
    }),
  body('newPassword', 'Password must have at least 6 characters').trim().isLength({ min: 6 }).escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // TODO handle validation errors properly
      next(errors.array());
      return;
    }
    try {
      const newPasswordHashed = await bcrypt.hash(req.body.newPassword, 10);
      const user = await User
        .findByIdAndUpdate(req.user._id, {
          password: newPasswordHashed,
        }, { new: true });
      res.json({
        user,
      });
    } catch (err) {
      next(err);
    }
  },
]);

module.exports = router;
