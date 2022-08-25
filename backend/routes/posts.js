const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

router.get('/', (req, res, next) => {
  const friendsIds = req.user.friendList
    .filter((friendship) => friendship.status === 'friends')
    .map((friendship) => friendship.user);

  Post
    .find({ author: { $in: [...friendsIds, req.user._id] } })
    .sort({ date: 'descending' })
    .exec((err, posts) => {
      if (err) {
        next(err);
        return;
      }
      res.json({
        posts,
      });
    });
});

module.exports = router;
