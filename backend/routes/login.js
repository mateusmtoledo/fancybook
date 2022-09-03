const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const googleRouter = require('./google');

router.use('/google', googleRouter);

router.post('/', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      next(err);
      return;
    }
    if (!user) {
      next(new Error('Invalid credentials'));
      return;
    }
    req.login(user, { session: false }, (err) => {
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
    });
  })(req, res);
});

router.get('/', [
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    res.json({
      user: req.user.toObject(),
    });
  },
]);

module.exports = router;
