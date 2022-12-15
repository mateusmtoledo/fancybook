const request = require('supertest');
const { app } = require('../../functions/app');
const { fakeUsers } = require('../../database/seeding/fakeUsers');
const { fakePosts } = require('../../database/seeding/fakePosts');
const User = require('../../models/User');
const Post = require('../../models/Post');
const getSessionId = require('../../jest/utils/getSessionId');

let sid;

beforeEach(async () => {
  await User.insertMany(fakeUsers);
  await Post.insertMany(fakePosts);
  sid = await getSessionId(app, {
    email: fakeUsers[0].email,
    password: fakeUsers[0].plainTextPassword,
  });
});

describe('userPosts route', () => {
  it('requires authentication', async () => {
    await request(app).get(`/users/${fakeUsers[0]._id}/posts`).expect(401);
  });

  it('only retrives posts from requested users', async () => {
    await request(app)
      .get(`/users/${fakeUsers[0]._id}/posts`)
      .set('Cookie', `connect.sid=${sid}`)
      .expect(200)
      .expect((response) => {
        const { posts } = response.body;
        expect(posts.length).toBe(3);
        expect(posts.every((post) => post.author === fakeUsers[0]._id));
      });
  });
});
