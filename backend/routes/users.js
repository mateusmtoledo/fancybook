const express = require('express');
const User = require('../models/User');

const router = express.Router();

const friendsRouter = require('./friends');

router.use('/:userId/friends', friendsRouter);

router.get('/:userId', (req, res, next) => {
  const requestedUserId = req.params.userId;
  // const usersAreFriends = req.user.friendList.some(
  //   (friendship) => friendship
  //     .user.toString() === requestedUserId && friendship.status === 'friends',
  // );
  const projection = 'firstName lastName fullName avatar';
  // if (usersAreFriends) projection += ' friendList';

  User.findById(requestedUserId, projection, (err, requestedUser) => {
    if (err) {
      next(err);
      return;
    }
    if (!requestedUser) {
      next();
      return;
    }

    res.json({
      user: requestedUser,
    });
  });
});

module.exports = router;
