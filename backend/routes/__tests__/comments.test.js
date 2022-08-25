const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../../app');
const { fakeUsers } = require('../../databaseUtils/seeding/staticFakeUsers');
const { fakePosts } = require('../../databaseUtils/seeding/staticFakePosts');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const { addFriend } = require('../../databaseUtils/operations/friendsManager');

let token;
let postWithComments;

const loginCredentials = {
  email: fakeUsers[0].email,
  password: fakeUsers[0].password,
};

const hashedPassword = bcrypt.hashSync(fakeUsers[0].password, 10);
fakeUsers[0].password = hashedPassword;

beforeEach(async () => {
  await User.insertMany(fakeUsers);
  await Post.insertMany(fakePosts);
  postWithComments = await Post.findOne({ author: fakeUsers[1]._id });
  await Comment.insertMany([
    {
      text: 'Ipsa ipsa accusantium aut.\nIn aut labore cumque itaque nihil fugit eaque.',
      author: fakeUsers[2]._id,
      post: postWithComments._id,
    },
    {
      text: 'Ipsa ipsa accusantium aut.',
      author: fakeUsers[3]._id,
      post: postWithComments._id,
    },
  ]);
  token = await request(app)
    .post('/login')
    .send(loginCredentials)
    .then((response) => response.body.token);
});

describe('comments route', () => {
  it('responds with 401 if user is not friends with post author', async () => {
    await addFriend(fakeUsers[0]._id, fakeUsers[1]._id);
    await request(app)
      .get(`/posts/${postWithComments._id}/comments`)
      .auth(token, { type: 'bearer' })
      .expect(401);
  });

  it('sends comments', async () => {
    await addFriend(fakeUsers[0]._id, fakeUsers[1]._id);
    await addFriend(fakeUsers[1]._id, fakeUsers[0]._id);
    await request(app)
      .get(`/posts/${postWithComments._id}/comments`)
      .auth(token, { type: 'bearer' })
      .expect((response) => {
        expect(response.status).toBe(200);
        expect(response.body.comments.length).toBe(2);
      });
  });
});
