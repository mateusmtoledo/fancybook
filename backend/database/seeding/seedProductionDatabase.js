require('dotenv').config();
const readline = require('readline');
const mongoose = require('mongoose');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const Like = require('../../models/Like');
const {
  generateRandomUser,
  generateRandomPost,
  generateRandomComment,
  generateLike,
} = require('./fakeDataGenerator');

const mongoDB = process.env.MONGODB_URL_PRODUCTION;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function createUsers(numberOfUsers) {
  return new Array(numberOfUsers)
    .fill(null)
    .map((_, i) => generateRandomUser(i));
}

function savePosts(users) {
  const posts = [];
  users.forEach((user) => {
    const numberOfPosts = Math.floor(Math.random() * 15);
    for (let i = 0; i < numberOfPosts; i += 1) {
      posts.push(generateRandomPost(user._id));
    }
  });
  return Post.insertMany(posts);
}

function saveComments(users, posts) {
  const comments = [];
  posts.forEach((post) => {
    const numberOfComments = Math.floor(Math.random() * users.length);
    for (let i = 0; i < numberOfComments; i += 1) {
      const user = users[Math.floor(Math.random() * users.length)];
      comments.push(generateRandomComment(user._id, post._id, post.date));
    }
  });
  return Comment.insertMany(comments);
}

function saveUsersWithRandomFriends(users) {
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
  return User.insertMany(users);
}

function setRandomLikes(users, posts) {
  const likes = [];
  posts.forEach((post) => {
    const shuffledUsers = users
      .map((user) => ({ user, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ user }) => user);
    const numberOfLikes = Math.floor(Math.random() * shuffledUsers.length);
    const selectedUsers = shuffledUsers.slice(0, numberOfLikes);
    selectedUsers.forEach((user) => {
      likes.push(generateLike(user._id, post._id, post.date));
    });
  });
  return Like.insertMany(likes);
}

async function seedDatabase(numberOfUsers) {
  const users = createUsers(numberOfUsers);
  const [posts] = await Promise.all([
    savePosts(users),
    saveUsersWithRandomFriends(users),
  ]);
  await Promise.all([saveComments(users, posts), setRandomLikes(users, posts)]);
  console.log('Done');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  'Are you sure you want to seed the PRODUCTION DATABASE? (Y/N)\n',
  (answer) => {
    rl.close();
    if (answer === 'Y') {
      seedDatabase(50);
    } else {
      console.log('Cancelled');
    }
  },
);
