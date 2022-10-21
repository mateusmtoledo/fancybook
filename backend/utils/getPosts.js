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
      .concat([req.user._id]);

  try {
    const posts = await Post
      .paginate({
        author: { $in: ids },
      }, paginateOptions);
    posts.docs = posts.docs.map((doc) => doc.toObject());
    const commentCounts = [];
    const likeCounts = [];
    posts.docs.forEach((doc) => {
      commentCounts.push(Comment
        .countDocuments({ post: doc._id })
        .then((count) => {
          // eslint-disable-next-line no-param-reassign
          doc.commentCount = count;
        }));
      likeCounts.push(Like
        .countDocuments({ post: doc._id })
        .then((count) => {
          // eslint-disable-next-line no-param-reassign
          doc.likeCount = count;
        }));
    });
    Promise.all([...commentCounts, ...likeCounts]).then(() => {
      req.posts = posts;
      next();
    });
  } catch (err) {
    next(err);
  }
};
