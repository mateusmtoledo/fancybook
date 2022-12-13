const express = require('express');
const passport = require('passport');
require('dotenv').config();

const router = express.Router();
const { body, validationResult } = require('express-validator');

const sampleRouter = require('./sample');
const googleRouter = require('./googleauth');
const { isAuthenticated } = require('../middleware/authentication');

router.use('/sample', sampleRouter);
router.use('/google', googleRouter);

router.post(
  ['/', '/sample'],
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
    } else {
      next();
    }
  },
  passport.authenticate('local'),
  (req, res) => {
    res.json('Successfully signed in!');
  },
);

router.get('/', isAuthenticated, (req, res) => {
  res.json({
    user: req.user,
  });
});

module.exports = router;
