const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const { generateRandomUser, generateRandomPost, generateRandomComment } = require('./fakeData');
// const { addFriend } = require('../operations/friendsManager');
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

// async function sendFriendRequests(requesterId, users) {
//   const potentialFriends = users.filter((user) => !requesterId.equals(user._id));
//   for (let i = 0; i < potentialFriends.length; i += 1) {
//     if (Math.floor(Math.random() * 2)) {
//       // eslint-disable-next-line no-await-in-loop
//       await addFriend(requesterId, potentialFriends[i]._id);
//     }
//   }
// }

// async function sendAllRequests(users) {
//   for (let i = 0; i < users.length; i += 1) {
//     // eslint-disable-next-line no-await-in-loop
//     await sendFriendRequests(users[i]._id, users);
//   }
// }

async function seedDatabase(numberOfUsers) {
  const users = await saveUsers(numberOfUsers);
  const posts = await savePosts(users);
  await saveComments(users, posts);
  // await sendAllRequests(users);
  console.log('Done');
}

seedDatabase(30);
