const request = require('supertest');
const app = require('../../app');
const { fakeUsers } = require('../../database/seeding/fakeUsersAndFriends');
const { fakePosts } = require('../../database/seeding/fakePosts');
const User = require('../../models/User');
const Post = require('../../models/Post');

const token = fakeUsers[0].authToken;
let users = [];

beforeEach(async () => {
  users = await User.insertMany(fakeUsers);
  await Post.insertMany(fakePosts);
});

describe('/posts GET method', () => {
  it('requires authentication', async () => {
    await request(app)
      .get('/posts')
      .expect(401);
  });

  it('only sends posts created by friends', async () => {
    await request(app)
      .get('/posts')
      .auth(token, { type: 'bearer' })
      .expect(async (response) => {
        const { posts } = response.body;
        expect(response.status).toBe(200);
        expect(posts.length).toBe(7);
        await User.findById(users[0]._id).then((user) => {
          const friendsIds = user.friendList
            .filter((friendship) => friendship.status === 'friends')
            .map((friendship) => friendship.user.str);
          posts
            .forEach((post) => expect([...friendsIds, user._id.str])
              .toContainEqual(post.author.str));
        });
      });
  });
});

describe('/posts POST method', () => {
  it('requires authentication', async () => {
    await request(app)
      .post('/posts')
      .expect(401);
  });

  it('saves post in the database', async () => {
    await request(app)
      .post('/posts')
      .auth(token, { type: 'bearer' })
      .send({
        text: 'I love fancybook!',
      })
      .expect(200)
      .then(async (response) => {
        const post = await Post.findById(response.body.post._id);
        expect(post.text).toBe('I love fancybook!');
      });
  });
});
