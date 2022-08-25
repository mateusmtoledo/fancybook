const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const { fakeUsers } = require('./staticFakeUsers');

const fakePosts = [];

function generateRandomPost(authorId) {
  return ({
    author: authorId,
    text: faker.lorem.lines(),
    date: Date.now() - Math.floor(Math.random() * 20000000000),
  });
}

fakeUsers.forEach((user) => {
  const numberOfPosts = Math.floor(Math.random() * 4);
  for (let i = 0; i < numberOfPosts; i += 1) {
    fakePosts.push(generateRandomPost(user._id));
  }
});

console.log(JSON.stringify(fakePosts, null, 2));

fs.writeFileSync('./databaseUtils/seeding/staticFakePosts.js', JSON.stringify(fakePosts, null, 2), 'utf-8');
