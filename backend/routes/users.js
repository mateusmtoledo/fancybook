const express = require('express');
const User = require('../models/User');

const router = express.Router();

const friendsRouter = require('./friends');
const userPostsRouter = require('./userPosts');

router.use('/:userId/friends', friendsRouter);
router.use('/:userId/posts', userPostsRouter);

router.get('/', async (req, res, next) => {
  const search = req.query.search || '';
  const regex = new RegExp(search, 'gi');
  const projection = 'firstName lastName fullName avatar';
  try {
    const users = await User
      .find(
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ['$firstName', ' ', '$lastName'] },
              regex,
            },
          },
        },
        projection,
      )
      .limit(8);
    res.json({
      users,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  const requestedUserId = req.params.userId;
  const projection = 'firstName lastName fullName avatar';
  try {
    const requestedUser = await User
      .findById(requestedUserId, projection);
    if (!requestedUser) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    res.json({
      user: requestedUser,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
