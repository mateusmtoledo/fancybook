const express = require('express');
const Post = require('../models/Post');

const router = express.Router({ mergeParams: true });

router.get('/', (req, res, next) => {
  const { userId } = req.params;
  Post.find({ author: userId }, (err, posts) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ posts });
  });
});

module.exports = router;
