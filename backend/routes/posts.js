const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const { getPosts } = require('../utils/getPosts');

const router = express.Router();

const commentsRouter = require('./comments');
const likesRouter = require('./likes');

router.use('/:postId/comments', commentsRouter);
router.use('/:postId/likes', likesRouter);

router.get('/', getPosts, async (req, res) => {
  const { posts } = req;
  res.json({
    posts: posts.docs,
    hasNextPage: posts.hasNextPage,
  });
});

router.post('/', [
  body('text', 'Your post must have 3 to 2048 characters')
    .trim()
    .isLength({ min: 3, max: 2048 })
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error();
      err.statusCode = 400;
      err.invalidFields = errors.mapped();
      next(err);
      return;
    }
    try {
      const post = await new Post({
        author: req.user._id,
        text: req.body.text,
      }).save();
      await post.populate('author', 'firstName lastName fullName avatar');
      res.json({
        post: {
          ...post.toObject(),
          likeCount: 0,
          commentCount: 0,
          userHasLiked: false,
        },
      });
    } catch (err) {
      next(err);
    }
  },
]);

module.exports = router;
