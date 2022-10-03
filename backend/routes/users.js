const express = require('express');
const User = require('../models/User');

const router = express.Router();

const meRouter = require('./me');
const friendsRouter = require('./friends');
const userPostsRouter = require('./userPosts');

router.use('/me', meRouter);
router.use('/:userId/friends', friendsRouter);
router.use('/:userId/posts', userPostsRouter);

router.get('/', async (req, res, next) => {
  const search = req.query.search || '';
  const regex = new RegExp(search, 'gi');
  const paginateOptions = {
    limit: 8,
    page: Number(req.query.page) >= 1 ? Number(req.query.page) : 1,
    select: 'firstName lastName fullName avatar',
  };
  try {
    const users = await User
      .paginate(
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ['$firstName', ' ', '$lastName'] },
              regex,
            },
          },
        },
        paginateOptions,
      );
    res.json({
      users: users.docs,
      hasNextPage: users.hasNextPage,
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
