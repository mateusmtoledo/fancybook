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

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(errors.array());
      return;
    }
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    User.findOne({ email }, (err, result) => {
      if (err) {
        next(err);
        return;
      }
      if (result) {
        next(new Error('Email already in use'));
        return;
      }
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          next(err);
          return;
        }
        new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        }).save((err, user) => {
          if (err) {
            next(err);
            return;
          }
          const userResponse = { ...user.toJSON() };
          delete userResponse.password;
          delete userResponse.__v;
          res.json(userResponse);
        });
      });
    });
  },
]);

module.exports = router;
