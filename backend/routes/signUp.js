const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/', [
  body('firstName', 'First name is required').trim().isLength({ min: 1 }).escape(),
  body('lastName', 'Last name is required').trim().isLength({ min: 1 }).escape(),
  body('email', 'Email is invalid').isEmail().normalizeEmail(),
  body('password', 'Password must have at least 6 characters').trim().isLength({ min: 6 }).escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // TODO handle validation errors properly
      next(errors.array());
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
        err.statusCode = 409;
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
