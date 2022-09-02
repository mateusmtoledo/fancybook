const request = require('supertest');
const app = require('../../app');
const { fakeUsers } = require('../../databaseUtils/seeding/staticFakeUsers');
const { fakePosts } = require('../../databaseUtils/seeding/staticFakePosts');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { addFriend } = require('../../databaseUtils/operations/friendsManager');

const token = fakeUsers[0].authToken;

beforeEach(async () => {
  await User.insertMany(fakeUsers);
  await Post.insertMany(fakePosts);
});

describe('/posts GET method', () => {
  it('requires authentication', async () => {
    await request(app)
      .get('/posts')
      .expect(401);
  });

  it('only sends posts created by friends', async () => {
    const ids = fakeUsers.map((user) => user._id);
    await addFriend(ids[0], ids[3]);
    await addFriend(ids[0], ids[4]);
    await addFriend(ids[0], ids[5]);
    await addFriend(ids[3], ids[8]);
    await addFriend(ids[4], ids[6]);
    await addFriend(ids[0], ids[8]);
    await addFriend(ids[9], ids[0]);
    await addFriend(ids[5], ids[0]);
    await addFriend(ids[4], ids[0]);

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
