const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../../app');
const { fakeUsers } = require('../../databaseUtils/seeding/staticFakeUsers');
const { fakePosts } = require('../../databaseUtils/seeding/staticFakePosts');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { addFriend } = require('../../databaseUtils/operations/friendsManager');

let token;
const loginCredentials = {
  email: fakeUsers[0].email,
  password: fakeUsers[0].password,
};
let savedUsers;

const hashedPassword = bcrypt.hashSync(fakeUsers[0].password, 10);
fakeUsers[0].password = hashedPassword;

beforeEach(async () => {
  savedUsers = await User.insertMany(fakeUsers);
  await Post.insertMany(fakePosts);
  token = await request(app)
    .post('/login')
    .send(loginCredentials)
    .then((response) => response.body.token);
});

describe('/posts GET method', () => {
  it('requires authentication', async () => {
    await request(app)
      .get('/posts')
      .expect(401);
  });

  it('only sends posts created by friends', async () => {
    const ids = fakeUsers.map((user) => user._id);
    await addFriend(ids[0], ids[1]);
    await addFriend(ids[0], ids[2]);
    await addFriend(ids[0], ids[3]);
    await addFriend(ids[1], ids[6]);
    await addFriend(ids[2], ids[4]);
    await addFriend(ids[0], ids[6]);
    await addFriend(ids[7], ids[0]);
    await addFriend(ids[3], ids[0]);
    await addFriend(ids[2], ids[0]);

    await request(app)
      .get('/posts')
      .auth(token, { type: 'bearer' })
      .expect((response) => {
        const { posts } = response.body;
        User.findById(savedUsers[0]._id).then((user) => {
          const friendsIds = user.friendList
            .filter((friendship) => friendship.status === 'friends')
            .map((friendship) => friendship.user.str);
          posts
            .forEach((post) => expect([...friendsIds, user._id.str])
              .toContainEqual(post.author.str));
        });
        expect(response.status).toBe(200);
        expect(posts.length).toBe(7);
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
