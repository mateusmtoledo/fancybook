const request = require('supertest');
const app = require('../../app');
const { fakeUsers } = require('../../databaseUtils/seeding/staticFakeUsers');
const { fakePosts } = require('../../databaseUtils/seeding/staticFakePosts');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { sendFriendRequest, acceptFriendRequest } = require('../../databaseUtils/operations/friendsManager');

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
    await sendFriendRequest({ from: users[0], to: users[3] });
    await sendFriendRequest({ from: users[0], to: users[4] });
    await sendFriendRequest({ from: users[0], to: users[5] });
    await sendFriendRequest({ from: users[9], to: users[0] });
    await acceptFriendRequest({ from: users[4], to: users[0] });
    await acceptFriendRequest({ from: users[5], to: users[0] });

    await request(app)
      .get('/posts')
      .auth(token, { type: 'bearer' })
      .expect((response) => {
        const { posts } = response.body;
        User.findById(fakeUsers[0]._id).then((user) => {
          const friendsIds = user.friendList
            .filter((friendship) => friendship.status === 'friends')
            .map((friendship) => friendship.user.str);
          posts
            .forEach((post) => expect([...friendsIds, user._id.str])
              .toContainEqual(post.author.str));
        });
        expect(response.status).toBe(200);
        expect(posts.length).toBe(6);
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
