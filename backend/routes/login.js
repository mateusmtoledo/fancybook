const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const { body, validationResult } = require('express-validator');
const googleRouter = require('./googleauth');

router.use('/google', googleRouter);

router.post(
  '/',
  [
    body('email', 'Email is required').trim().isLength({ min: 1 }).escape(),
    body('password', 'Password is required')
      .trim()
      .isLength({ min: 1 })
      .escape(),
  ],
  (req, res, next) => {
    const errors = validationResult.withDefaults({
      formatter: (error) => ({ msg: error.msg, location: error.location }),
    })(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.statusCode = 400;
      error.invalidFields = errors.mapped();
      next(error);
    }
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err) {
        next(err);
        return;
      }
      jwt.sign(user, process.env.JWT_SECRET, (err, token) => {
        if (err) {
          next(err);
          return;
        }
        res.json({
          token,
        });
      });
    })(req, res);
  },
);

router.get('/', [
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    res.json({
      user: req.user.toObject(),
    });
  },
]);

module.exports = router;
