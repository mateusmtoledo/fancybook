const express = require('express');
const User = require('../models/User');

const router = express.Router();

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
    const response = { ...requestedUser.toJSON() };
    delete response.__v;

    res.json({
      user: response,
    });
  });
});

module.exports = router;
