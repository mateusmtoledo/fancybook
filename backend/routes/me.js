const express = require('express');
const { body, validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const router = express.Router();

router.put('/avatar', async (req, res, next) => {
  if (!req.body.avatar) {
    const err = new Error('Invalid image file');
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    const image = await cloudinary.uploader.upload(req.body.avatar);
    const urlArr = image.secure_url.split('/');
    urlArr
      .splice(urlArr.length - 2, 0, 'w_256,h_256,c_fill');
    const avatarUrl = urlArr.join('/');
    const user = await User.findByIdAndUpdate(req.user._id, { avatar: avatarUrl }, { new: true });
    res.json({
      user,
    });
  } catch (err) {
    next(err);
  }
});

router.put('/name', [
  body('firstName', 'First name must have 1 to 35 characters').trim().isLength({ min: 1, max: 35 }).escape(),
  body('lastName', 'Last name must have 1 to 35 characters').trim().isLength({ min: 1, max: 35 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.statusCode = 400;
      error.invalidFields = errors.mapped();
      next(error);
      return;
    }
    try {
      const user = await User
        .findByIdAndUpdate(req.user._id, {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        }, { new: true });
      res.json({
        user,
      });
    } catch (err) {
      next(err);
    }
  },
]);

router.put('/bio', [
  body('bio', 'Bio should have a maximum of 155 characters').trim().isLength({ max: 155 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.statusCode = 400;
      error.invalidFields = errors.mapped();
      next(error);
      return;
    }
    try {
      const user = await User
        .findByIdAndUpdate(req.user._id, {
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

router.put('/email', [
  body('email').trim().normalizeEmail()
    .isEmail()
    .withMessage('Invalid email address')
    .isLength({ min: 7, max: 254 })
    .withMessage('Email must have 7 to 254 characters')
    .escape()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('Email is already in use');
      }
    }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.statusCode = 400;
      error.invalidFields = errors.mapped();
      next(error);
      return;
    }
    try {
      const user = await User
        .findByIdAndUpdate(req.user._id, {
          email: req.body.email,
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
      if (!user.password) return;
      const res = await bcrypt.compare(password, user.password);
      if (!res) {
        throw new Error();
      }
    })
    .withMessage('Wrong password'),
  body('newPassword', 'New password must have at least 6 characters').trim().isLength({ min: 6 }).escape(),

  async (req, res, next) => {
    const errors = validationResult.withDefaults({
      formatter: (error) => ({ msg: error.msg, location: error.location }),
    })(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.statusCode = 400;
      error.invalidFields = errors.mapped();
      next(error);
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
