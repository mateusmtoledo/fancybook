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
  sendFriendRequest({ from: req.user._id, to: userId }).then(() => {
    res.json('Success');
  }).catch((err) => {
    next(err);
  });
});

router.put('/', (req, res, next) => {
  const { userId } = req.params;
  acceptFriendRequest({ from: req.user, to: userId }).then(() => {
    res.json('Success');
  }).catch((err) => {
    next(err);
  });
});

router.delete('/', (req, res, next) => {
  const { userId } = req.params;
  removeFriend({ from: req.user, to: userId }).then(() => {
    res.json('Success');
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;
