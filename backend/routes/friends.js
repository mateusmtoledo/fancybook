const express = require('express');
const User = require('../models/User');
const {
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend,
} = require('../utils/friendsManagement');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  const { userId } = req.params;
  const projection = 'firstName lastName fullName avatar';
  try {
    const user = await User.findById(userId)?.populate(
      'friendList.user',
      projection,
    );
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    const page = Number(req.query.page) >= 1 ? Number(req.query.page) : 1;
    const friendshipStatus = req.user._id.equals(userId)
      ? undefined
      : req.user.friendList.find((friendship) =>
          friendship.user._id.equals(user._id),
        )?.status || null;
    const usersFriends = user
      .toObject()
      .friendList.filter((friendship) => friendship.status === 'friends');
    const friendCount = usersFriends.length;
    const friends = usersFriends
      .slice((page - 1) * 6, page * 6)
      .map((friendship) => friendship.user);
    res.json({
      friends,
      friendshipStatus,
      friendCount,
      hasNextFriendsPage: page * 6 < friendCount,
    });
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
