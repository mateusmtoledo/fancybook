const express = require('express');
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

module.exports = router;
