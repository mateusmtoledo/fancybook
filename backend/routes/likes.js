const express = require('express');
const Post = require('../models/Post');

const router = express.Router({ mergeParams: true });

router.get('/', (req, res, next) => {
  const { postId } = req.params;
  const selection = 'firstName lastName fullName avatar';
  Post.findById(postId).populate('likes', selection).exec((err, post) => {
    if (err) {
      next(err);
      return;
    }
    if (!req
      .user
      .friendList
      .some((friendship) => friendship.status === 'friends'
      && friendship.user.equals(post.author))
    ) {
      res.status(401).json(new Error('Unauthorized'));
      return;
    }
    res.json({
      likes: post.likes,
    });
  });
});

router.post('/', (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId).exec((err, post) => {
    if (err) {
      next(err);
      return;
    }
    if (!req
      .user
      .friendList
      .some((friendship) => friendship.status === 'friends'
      && friendship.user.equals(post.author))
    ) {
      res.status(401).json(new Error('Unauthorized'));
      return;
    }
    if (post.likes.some((user) => user.equals(req.user._id))) {
      res.status(400).json(new Error('User has already liked post'));
      return;
    }
    post.likes.push(req.user._id);
    post.save((err, savedPost) => {
      if (err) {
        next(err);
        return;
      }
      const selection = 'firstName lastName fullName avatar';
      savedPost.populate('likes', selection, (err, populatedPost) => {
        res.json({
          likes: populatedPost.likes,
        });
      });
    });
  });
});

module.exports = router;
