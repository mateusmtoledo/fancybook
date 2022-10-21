const express = require('express');
const { getPosts } = require('../utils/getPosts');

const router = express.Router({ mergeParams: true });

router.get('/', getPosts, async (req, res) => {
  const { posts } = req;
  res.json({
    posts: posts.docs,
    hasNextPage: posts.hasNextPage,
  });
});

module.exports = router;
