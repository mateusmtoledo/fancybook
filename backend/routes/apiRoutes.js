const express = require('express');

const router = express.Router();

const signUpRouter = require('./signUp');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const usersRouter = require('./users');
const postsRouter = require('./posts');
const { isAuthenticated } = require('../middleware/authentication');

router.get('/', (req, res) => {
  res.send('Fancybook');
});
router.use('/sign-up', signUpRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/users', isAuthenticated, usersRouter);
router.use('/posts', isAuthenticated, postsRouter);

router.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  console.log(err);
  if (err.statusCode) {
    res
      .status(err.statusCode)
      .json(err.invalidFields || err.friendshipStatus ? err : err.message);
  } else if (err.http_code) {
    res.status(err.http_code).json(err.message);
  } else {
    res.status(500).json('Something went wrong');
  }
  res.status(500);
});

module.exports = router;
