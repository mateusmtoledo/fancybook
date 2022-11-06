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
    const users = await User.paginate(
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
  const projection =
    'firstName lastName fullName avatar bio friendList coverPhoto';
  try {
    const requestedUser = await User.findById(
      requestedUserId,
      projection,
    )?.populate({
      path: 'friendList.user',
      select: 'avatar firstName lastName fullName coverPhoto',
    });
    if (!requestedUser) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    const friendshipStatus =
      req.user.friendList.find((friendship) =>
        friendship.user._id.equals(requestedUser._id),
      )?.status || null;
    const userResponse = requestedUser.toObject();
    const usersFriends = userResponse.friendList.filter(
      (friendship) => friendship.status === 'friends',
    );
    const friendCount = usersFriends.length;
    userResponse.friends = usersFriends
      .slice(0, 9)
      .map((friendship) => friendship.user);
    delete userResponse.friendList;
    res.json({
      user: userResponse,
      friendshipStatus,
      friendCount,
      hasNextFriendsPage: friendCount > 9,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
