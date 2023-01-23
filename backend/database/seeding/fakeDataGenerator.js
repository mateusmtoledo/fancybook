// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker/locale/en_US');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const avatars = require('./avatars.json');

exports.generateRandomUser = (avatarIndex, sample = true) => {
  const _id = mongoose.Types.ObjectId();
  const avatar =
    avatars[avatarIndex || Math.floor(Math.random() * avatars.length)];
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const bio = faker.lorem.paragraphs(Math.floor(Math.random() * 5));
  const username = `${firstName} ${lastName}`.split(' ').join('').toLowerCase();
  const email = `${username}@fancybook.com`;
  const password = bcrypt.hashSync(username, 10);
  const friendList = [];
  return {
    _id,
    firstName,
    lastName,
    avatar,
    friendList,
    bio,
    username,
    email,
    password,
    sample,
  };
};

exports.generateRandomPost = (authorId) => ({
  author: authorId,
  text: faker.lorem.lines(),
  date: Date.now() - Math.floor(Math.random() * 20000000000),
});

exports.generateRandomComment = (authorId, postId, postDate) => ({
  author: authorId,
  post: postId,
  text: faker.lorem.lines(),
  date: Math.floor(
    Math.random() * (Date.now() - postDate.getTime()) + postDate.getTime(),
  ),
});

exports.generateLike = (userId, postId, postDate) => ({
  author: userId,
  post: postId,
  date: Math.floor(
    Math.random() * (Date.now() - postDate.getTime()) + postDate.getTime(),
  ),
});
