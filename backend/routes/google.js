const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get(
  '/redirect',
  passport.authenticate('google', { failureRedirect: '/login/google', failureMessage: true }),
  (req, res, next) => {
    jwt.sign(req.user.toJSON(), process.env.JWT_SECRET, (err, token) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect(`${process.env.ORIGIN}/googleauth?token=${token}`);
    });
  },
);

router.get('/', passport.authenticate('google', {
  scope: [
    'profile',
    'email',
  ],
}));

module.exports = router;
