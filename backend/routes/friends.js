const express = require('express');
const User = require('../models/User');
const { sendFriendRequest, acceptFriendRequest, removeFriend } = require('../utils/friendsManagement');

const router = express.Router({ mergeParams: true });

router.get('/', (req, res, next) => {
  let { userId } = req.params;
  if (userId === 'me') userId = req.user._id;

  const projection = 'firstName lastName fullName avatar';

  User.findById(userId)
    .populate('friendList.user', projection)
    .exec((err, user) => {
      if (err) {
        next(err);
        return;
      }
      if (!user) {
        next(new Error('User not found'));
        return;
      }
      const response = {};
      response.friends = user
        .friendList
        .filter((friendship) => friendship.status === 'friends')
        .map((friendship) => friendship.user);
      if (req.user._id.equals(userId)) {
        response.pending = user
          .friendList
          .filter((friendship) => friendship.status === 'pending')
          .map((friendship) => friendship.user);
        response.sent = user
          .friendList
          .filter((friendship) => friendship.status === 'sent')
          .map((friendship) => friendship.user);
      }
      res.json(response);
    });
});

router.post('/', (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) {
      next(err);
      return;
    }
    if (!user) {
      next(new Error('User not found'));
      return;
    }
    try {
      sendFriendRequest({ from: req.user, to: user });
      res.json('Success');
    } catch (err) {
      next(err);
    }
  });
});

router.put('/', (req, res, next) => {
  const { userId } = req.params;
  const friendship = req.user.friendList
    .find((friendship) => friendship.user.equals(userId));
  if (!friendship || friendship.status !== 'pending') {
    next(new Error('friendship request not found'));
    return;
  }
  User.findById(userId, (err, user) => {
    if (err) {
      next(err);
      return;
    }
    if (!user) {
      next(new Error('User not found'));
      return;
    }
    acceptFriendRequest({ from: req.user, to: user });
    res.json('Success');
  });
});

router.delete('/', (req, res, next) => {
  const { userId } = req.params;
  const thereIsFriendship = req.user.friendList
    .some((friendship) => friendship.user.equals(userId));
  if (!thereIsFriendship) {
    next(new Error('friendship not found'));
    return;
  }
  User.findById(userId, (err, user) => {
    if (err) {
      next(err);
      return;
    }
    if (!user) {
      next(new Error('User not found'));
      return;
    }
    removeFriend({ from: req.user, to: user });
    res.json('Success');
  });
});

module.exports = router;
