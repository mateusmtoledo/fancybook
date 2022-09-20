const express = require('express');
const Comment = require('../models/Comment');

const router = express.Router({ mergeParams: true });

router.get('/', (req, res, next) => {
  const { postId } = req.params;
  Comment.find({ post: postId }, (err, comments) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ comments });
  });
});

module.exports = router;
