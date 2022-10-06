const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const Like = require('../../models/Like');
const {
  generateRandomUser, generateRandomPost, generateRandomComment, generateLike,
} = require('./fakeDataGenerator');
require('../config/mongoSetup');

function saveUsers(numberOfUsers) {
  return User
    .insertMany(new Array(numberOfUsers).fill(null).map(() => generateRandomUser()));
}

function savePosts(users) {
  const promises = [];
  users.forEach((user) => {
    const numberOfPosts = Math.floor(Math.random() * 4);
    for (let i = 0; i < numberOfPosts; i += 1) {
      promises.push(new Post(generateRandomPost(user._id)).save());
    }
  });
  return Promise.all(promises);
}

function saveComments(users, posts) {
  const promises = [];
  users.forEach((user) => {
    const numberOfComments = Math.floor(Math.random() * 20);
    for (let i = 0; i < numberOfComments; i += 1) {
      const post = posts[Math.floor(Math.random() * posts.length)];
      promises.push(new Comment(generateRandomComment(user._id, post._id, post.date)).save());
    }
  });
  return Promise.all(promises);
}

function makeRandomFriends(users) {
  for (let i = 0; i < users.length; i += 1) {
    for (let j = i + 1; j < users.length; j += 1) {
      const randomNumber = Math.floor(Math.random() * 4);
      switch (randomNumber) {
        case 1:
          users[i].friendList.push({
            user: users[j]._id,
            status: 'sent',
          });
          users[j].friendList.push({
            user: users[i]._id,
            status: 'pending',
          });
          break;
        case 2:
          users[i].friendList.push({
            user: users[j]._id,
            status: 'pending',
          });
          users[j].friendList.push({
            user: users[i]._id,
            status: 'sent',
          });
          break;
        case 3:
          users[i].friendList.push({
            user: users[j]._id,
            status: 'friends',
          });
          users[j].friendList.push({
            user: users[i]._id,
            status: 'friends',
          });
          break;
        default:
          break;
      }
    }
  }
  return Promise.all(users.map((user) => user.save()));
}

function setRandomLikes(users, posts) {
  const promises = [];
  users.forEach((user) => {
    posts.forEach((post) => {
      if (Math.floor(Math.random() * 2)) {
        promises.push(new Like(generateLike(user._id, post._id)).save());
      }
    });
  });
  return Promise.all(promises);
}

async function seedDatabase(numberOfUsers) {
  const users = await saveUsers(numberOfUsers);
  const [posts] = await Promise.all([
    savePosts(users),
    makeRandomFriends(users),
  ]);
  await Promise.all([
    saveComments(users, posts),
    setRandomLikes(users, posts),
  ]);
  console.log('Done');
}

seedDatabase(50);
