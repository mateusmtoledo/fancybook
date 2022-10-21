const Comment = require('../models/Comment');
const Like = require('../models/Like');
const Post = require('../models/Post');

exports.getPosts = async (req, res, next) => {
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
  const ids = req.params.userId
    ? [req.params.userId]
    : req.user.friendList
      .filter((friendship) => friendship.status === 'friends')
      .map((friendship) => friendship.user)
      .concat(req.user._id);
  try {
    const posts = await Post
      .paginate({
        author: { $in: ids },
      }, paginateOptions);
    const promises = [];
    posts.docs = posts.docs.map((doc) => doc.toObject());
    const { docs } = posts;
    for (let i = 0; i < docs.length; i += 1) {
      promises.push(
        Comment
          .countDocuments({ post: docs[i]._id })
          .then((count) => {
            docs[i].commentCount = count;
          }),
        Like
          .countDocuments({ post: docs[i]._id })
          .then((count) => {
            docs[i].likeCount = count;
          }),
        Like
          .exists({ post: docs[i]._id, author: req.user._id })
          .then((result) => {
            docs[i].userHasLiked = !!result;
          }),
      );
    }
    Promise.all(promises).then(() => {
      req.posts = posts;
      next();
    });
  } catch (err) {
    next(err);
  }
};
