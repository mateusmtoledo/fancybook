const express = require('express');
const User = require('../models/User');

const router = express.Router();

const friendsRouter = require('./friends');

router.use('/:userId/friends', friendsRouter);

router.get('/', (req, res, next) => {
  const search = req.query.search || '';
  const regex = new RegExp(search, 'gi');
  const projection = 'firstName lastName fullName avatar';
  User.find(
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
    .limit(8)
    .exec((err, users) => {
      if (err) {
        next(err);
        return;
      }
      res.json({
        users,
      });
    });
});

router.get('/:userId', (req, res, next) => {
  const requestedUserId = req.params.userId;
  const projection = 'firstName lastName fullName avatar';

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
