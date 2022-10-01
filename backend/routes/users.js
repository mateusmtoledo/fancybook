const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
const User = require('../models/User');

const router = express.Router();

const friendsRouter = require('./friends');
const userPostsRouter = require('./userPosts');

router.use('/:userId/friends', friendsRouter);
router.use('/:userId/posts', userPostsRouter);

router.get('/', async (req, res, next) => {
  const search = req.query.search || '';
  const regex = new RegExp(search, 'gi');
  const paginateOptions = {
    limit: 8,
    page: Number(req.query.page) >= 1 ? Number(req.query.page) : 1,
    select: 'firstName lastName fullName avatar',
  };
  try {
    const users = await User
      .paginate(
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ['$firstName', ' ', '$lastName'] },
              regex,
            },
          },
        },
        paginateOptions,
      );
    res.json({
      users: users.docs,
      hasNextPage: users.hasNextPage,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  const requestedUserId = req.params.userId;
  const projection = 'firstName lastName fullName avatar';
  try {
    const requestedUser = await User
      .findById(requestedUserId, projection);
    if (!requestedUser) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    res.json({
      user: requestedUser,
    });
  } catch (err) {
    next(err);
  }
});

const upload = multer({ dest: './uploads/' });

router.post('/me/avatar', upload.single('avatar'), async (req, res, next) => {
  const filePath = `./${req.file.path}`;
  try {
    const image = await cloudinary.uploader.upload(filePath);
    const urlArr = image.secure_url.split('/');
    urlArr
      .splice(urlArr.length - 2, 0, 'w_256,h_256,c_scale');
    const avatarUrl = urlArr.join('/');
    const [user] = await Promise.all([
      User.findByIdAndUpdate(req.user._id, { avatar: avatarUrl }, { new: true }),
      fs.unlink(filePath),
    ]);
    res.json({
      user,
    });
  } catch (err) {
    await fs.unlink(filePath);
    next(err);
  }
});

module.exports = router;
