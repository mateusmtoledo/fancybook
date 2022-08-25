const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const { generateRandomUser, generateRandomPost, generateRandomComment } = require('./fakeData');
require('../config/mongoSetup');

async function saveUsers(numberOfUsers) {
  const users = await User
    .insertMany(new Array(numberOfUsers).fill(null).map(() => generateRandomUser()));
  return users;
}

async function savePosts(users) {
  const promises = [];
  users.forEach((user) => {
    const numberOfPosts = Math.floor(Math.random() * 4);
    for (let i = 0; i < numberOfPosts; i += 1) {
      promises.push(new Post(generateRandomPost(user._id)).save());
    }
  });
  return Promise.all(promises);
}

async function saveComments(users, posts) {
  const promises = [];
  users.forEach((user) => {
    const numberOfComments = Math.floor(Math.random() * 4);
    for (let i = 0; i < numberOfComments; i += 1) {
      const postId = posts[Math.floor(Math.random() * posts.length)]._id;
      promises.push(new Comment(generateRandomComment(user._id, postId)).save());
    }
  });
  return Promise.all(promises);
}

async function seedDatabase(numberOfUsers) {
  const users = await saveUsers(numberOfUsers);
  const posts = await savePosts(users);
  const comments = await saveComments(users, posts);
  console.log('Done');
  return {
    users,
    posts,
    comments,
  };
}

seedDatabase(30);
