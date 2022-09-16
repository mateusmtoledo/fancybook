const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');

const router = express.Router();

const commentsRouter = require('./comments');
const likesRouter = require('./likes');

router.use('/:postId/comments', commentsRouter);
router.use('/:postId/likes', likesRouter);

router.get('/', (req, res, next) => {
  const resultsPerPage = 8;
  const page = Number(req.query.page) >= 0 ? Number(req.query.page) : 0;

  const friendsIds = req.user.friendList
    .filter((friendship) => friendship.status === 'friends')
    .map((friendship) => friendship.user);

  Post
    .find({ author: { $in: [...friendsIds, req.user._id] } })
    .sort({ date: 'descending' })
    .limit(resultsPerPage)
    .skip(resultsPerPage * page)
    .select('author text date')
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
