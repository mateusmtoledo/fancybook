const express = require('express');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/Comment');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  const { postId } = req.params;
  const paginateOptions = {
    limit: 8,
    page: Number(req.query.page) >= 1 ? Number(req.query.page) : 1,
    sort: { date: 'descending' },
    select: 'author text date',
    populate: {
      path: 'author',
      select: 'firstName lastName fullName avatar',
    },
  };
  try {
    const comments = await Comment.paginate({ post: postId }, paginateOptions);
    res.json({
      comments: comments.docs,
      count: comments.totalDocs,
      hasNextPage: comments.hasNextPage,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', [
  body('text', 'Text is required').trim().isLength({ min: 3 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // TODO handle validation errors properly
      next(errors.array());
      return;
    }
    try {
      const { postId } = req.params;
      const savedComment = await new Comment({
        post: postId,
        author: req.user._id,
        text: req.body.text,
      }).save();
      res.json({
        comment: savedComment,
      });
    } catch (err) {
      next(err);
    }
  },
]);

module.exports = router;
