const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/redirect',
  passport.authenticate('github', {
    failureRedirect: '/',
    failureMessage: true,
  }),
  async (req, res) => {
    res.redirect(`${process.env.ORIGIN || 'http://localhost:3000'}`);
  },
);

router.get('/', passport.authenticate('github', { scope: ['user:email'] }));

module.exports = router;
