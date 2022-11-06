const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get(
  '/redirect',
  passport.authenticate('google', {
    failureRedirect: '/login/google',
    failureMessage: true,
  }),
  async (req, res, next) => {
    try {
      const token = await jwt.sign(req.user.toJSON(), process.env.JWT_SECRET);
      res.redirect(`${process.env.ORIGIN}?token=${token}`);
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

module.exports = router;
