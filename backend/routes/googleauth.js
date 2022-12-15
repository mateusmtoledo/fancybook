const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/redirect',
  passport.authenticate('google', {
    failureRedirect: 'api/login/google',
    failureMessage: true,
  }),
  async (req, res) => {
    res.redirect(`${process.env.ORIGIN || 'http://localhost:3000'}`);
  },
);

router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

module.exports = router;
