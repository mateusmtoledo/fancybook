const express = require('express');
const Post = require('../models/Post');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
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
  const { userId } = req.params;
  try {
    const posts = await Post
      .paginate({ author: userId }, paginateOptions);
    res.json({
      posts: posts.docs,
      hasNextPage: posts.hasNextPage,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
