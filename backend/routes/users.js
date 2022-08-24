const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

router.get('/:userId', [
  passport.authenticate('jwt', { session: false }),

  (req, res, next) => {
    const requestedUserId = req.params.userId;
    const usersAreFriends = req.user.friendList.some(
      (friendship) => friendship.user.toString() === requestedUserId && friendship.status === 'friends',
    );
    if (!usersAreFriends) {
      res.status(401).send('Unauthorized');
      return;
    }
    User.findById(requestedUserId, (err, requestedUser) => {
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
  },
]);

module.exports = router;
