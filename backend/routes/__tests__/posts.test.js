const request = require('supertest');
const app = require('../../api/index');
const { fakeUsers } = require('../../database/seeding/fakeUsersAndFriends');
const { fakePosts } = require('../../database/seeding/fakePosts');
const User = require('../../models/User');
const Post = require('../../models/Post');

const token = fakeUsers[0].authToken;

beforeEach(async () => {
  await User.insertMany(fakeUsers);
  await Post.insertMany(fakePosts);
});

describe('/posts GET method', () => {
  it('requires authentication', async () => {
    await request(app).get('/posts').expect(401);
  });

  it('only sends posts created by friends', async () => {
    await request(app)
      .get('/posts')
      .auth(token, { type: 'bearer' })
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
      .auth(token, { type: 'bearer' })
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
      .auth(token, { type: 'bearer' })
      .send({
        text: 'Aa',
      })
      .expect(400)
      .then((response) => {
        expect(response.body.invalidFields.text.msg).toBe(
          'Post must have at least 3 characters',
        );
      });
  });
});
