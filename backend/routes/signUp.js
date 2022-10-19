const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/', [
  body('firstName', 'First name must have 1 to 35 characters').trim().isLength({ min: 1, max: 35 }).escape(),
  body('lastName', 'Last name must have 1 to 35 characters').trim().isLength({ min: 1, max: 35 }).escape(),
  body('email', 'Email is invalid').isEmail().normalizeEmail()
    .custom(async (email) => {
      const emailInUse = await User.exists({ email });
      if (emailInUse) {
        throw new Error();
      }
    })
    .withMessage('Email is already in use'),
  body('password', 'Password must have at least 6 characters').trim().isLength({ min: 6 }).escape(),

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
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;
    try {
      const emailInUse = await User.exists({ email });
      if (emailInUse) {
        const err = new Error('Email already in use');
        err.statusCode = 400;
        throw err;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      }).save();
      const userResponse = { ...user.toJSON() };
      delete userResponse.password;
      delete userResponse.__v;
      res.json(userResponse);
    } catch (err) {
      next(err);
    }
  },
]);

module.exports = router;
