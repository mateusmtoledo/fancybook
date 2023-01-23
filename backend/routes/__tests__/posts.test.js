const request = require('supertest');
const { app } = require('../../functions/app');
const { fakeUsers } = require('../../database/seeding/fakeUsersAndFriends');
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

describe('/posts GET method', () => {
  it('requires authentication', async () => {
    await request(app).get('/posts').expect(401);
  });

  it('only sends posts created by friends', async () => {
    await request(app)
      .get('/posts')
      .set('Cookie', `connect.sid=${sid}`)
      .expect(200)
      .expect(async (response) => {
        const { posts } = response.body;
        expect(posts.length).toBe(7);
      });
  });
});

describe('/posts POST method', () => {
  it('requires authentication', async () => {
    await request(app).post('/posts').expect(401);
  });

  it('saves post in the database', async () => {
    let postId;
    await request(app)
      .post('/posts')
      .set('Cookie', `connect.sid=${sid}`)
      .send({
        text: 'I love fancybook!',
      })
      .expect(200)
      .then((response) => {
        postId = response.body.post._id;
      });
    const post = await Post.findById(postId);
    expect(post.text).toBe('I love fancybook!');
  });

  it('sends invalid fields as json', async () => {
    await request(app)
      .post('/posts')
      .set('Cookie', `connect.sid=${sid}`)
      .send({
        text: 'Aa',
      })
      .expect(400)
      .then((response) => {
        expect(response.body.invalidFields.text.msg).toBe(
          'Your post must have 3 to 2048 characters',
        );
      });
  });
});
