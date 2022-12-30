const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/redirect',
  passport.authenticate('twitter', {
    failureRedirect: '/',
    failureMessage: true,
  }),
  async (req, res) => {
    res.redirect(`${process.env.ORIGIN || 'http://localhost:3000'}`);
  },
);

router.get('/', passport.authenticate('twitter'));

module.exports = router;
