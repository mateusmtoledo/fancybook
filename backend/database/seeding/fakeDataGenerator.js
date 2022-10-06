// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

exports.generateRandomUser = () => {
  const avatar = `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/480/480`;
  const gender = faker.name.gender(true);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const username = (`${firstName} ${lastName}`).split(' ').join('').toLowerCase();
  const email = `${username}@fancybook.com`;
  const password = bcrypt.hashSync(username, 10);
  return ({
    firstName,
    lastName,
    gender,
    avatar,
    username,
    email,
    password,
    sample: true,
  });
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
  date: Math.floor(Math.random() * (Date.now() - postDate.getTime()) + postDate.getTime()),
});

exports.generateLike = (userId, postId) => ({
  author: userId,
  post: postId,
  date: Date.now() - Math.floor(Math.random() * 20000000000),
});
