const express = require('express');
const Comment = require('../models/Comment');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ post: postId });
    res.json({ comments });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
