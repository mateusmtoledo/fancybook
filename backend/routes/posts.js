const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');

const router = express.Router();

const commentsRouter = require('./comments');

router.use('/:postId/comments', commentsRouter);

router.get('/', (req, res, next) => {
  const friendsIds = req.user.friendList
    .filter((friendship) => friendship.status === 'friends')
    .map((friendship) => friendship.user);

  Post
    .find({ author: { $in: [...friendsIds, req.user._id] } })
    .sort({ date: 'descending' })
    .limit(8)
    .populate('author', 'firstName lastName fullName avatar')
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

router.post('/', [
  body('text', 'Text is required').trim().isLength({ min: 3 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(errors.array());
      return;
    }
    new Post({
      author: req.user._id,
      text: req.body.text,
    }).save((err, post) => {
      if (err) {
        next(err);
        return;
      }
      res.json({
        post,
      });
    });
  },
]);

module.exports = router;
