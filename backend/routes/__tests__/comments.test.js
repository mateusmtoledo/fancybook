const request = require('supertest');
const app = require('../../app');
const { fakeUsers } = require('../../databaseUtils/seeding/staticFakeUsers');
const { fakePosts } = require('../../databaseUtils/seeding/staticFakePosts');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const { sendFriendRequest, acceptFriendRequest } = require('../../databaseUtils/operations/friendsManager');

const token = fakeUsers[0].authToken;
let postWithComments;
let users = [];

beforeEach(async () => {
  users = await User.insertMany(fakeUsers);
  await Post.insertMany(fakePosts);
  postWithComments = await Post.findOne({ author: fakeUsers[3]._id });
  await Comment.insertMany([
    {
      text: 'Ipsa ipsa accusantium aut.\nIn aut labore cumque itaque nihil fugit eaque.',
      author: fakeUsers[4]._id,
      post: postWithComments._id,
    },
    {
      text: 'Ipsa ipsa accusantium aut.',
      author: fakeUsers[5]._id,
      post: postWithComments._id,
    },
  ]);
});

describe('comments route', () => {
  it('responds with 401 if user is not friends with post author', async () => {
    await sendFriendRequest({ from: users[0], to: users[1] });
    await acceptFriendRequest({ from: users[1], to: users[0] });
    await sendFriendRequest({ from: users[0], to: users[3] });
    await request(app)
      .get(`/posts/${postWithComments._id}/comments`)
      .auth(token, { type: 'bearer' })
      .expect(401);
  });

  it('sends comments', async () => {
    await sendFriendRequest({ from: users[0], to: users[3] });
    await acceptFriendRequest({ from: users[3], to: users[0] });
    await request(app)
      .get(`/posts/${postWithComments._id}/comments`)
      .auth(token, { type: 'bearer' })
      .expect((response) => {
        expect(response.status).toBe(200);
        expect(response.body.comments.length).toBe(2);
      });
  });
});
