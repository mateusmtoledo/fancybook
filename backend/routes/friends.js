const express = require('express');
const User = require('../models/User');
const { sendFriendRequest, acceptFriendRequest, removeFriend } = require('../utils/friendsManagement');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  let { userId } = req.params;
  if (userId === 'me') userId = req.user._id;
  const projection = 'firstName lastName fullName avatar';
  try {
    const user = await User.findById(userId).populate('friendList.user', projection);
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    const response = {
      friends: user
        .friendList
        .filter((friendship) => friendship.status === 'friends')
        .map((friendship) => friendship.user),
    };
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
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { userId } = req.params;
  try {
    await sendFriendRequest({ from: req.user._id, to: userId });
    res.json('Success'); // TODO make response more descriptive
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  const { userId } = req.params;
  try {
    await acceptFriendRequest({ from: req.user, to: userId });
    res.json('Success'); // TODO make response more descriptive
  } catch (err) {
    next(err);
  }
});

router.delete('/', async (req, res, next) => {
  const { userId } = req.params;
  try {
    await removeFriend({ from: req.user, to: userId });
    res.json('Success'); // TODO make response more descriptive
  } catch (err) {
    next(err);
  }
});

module.exports = router;
