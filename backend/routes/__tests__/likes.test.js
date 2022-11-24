const request = require('supertest');
const app = require('../../api/index');
const { fakeUsers } = require('../../database/seeding/fakeUsersAndFriends');
const { fakePosts } = require('../../database/seeding/fakePosts');
const { fakeLikes } = require('../../database/seeding/fakeLikes');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Like = require('../../models/Like');

beforeEach(async () => {
  await User.insertMany(fakeUsers);
  await Post.insertMany(fakePosts);
  await Like.insertMany(fakeLikes);
});

describe('likes router GET method', () => {
  it('requires authentication', async () => {
    await request(app).get('/posts/6324d197ac8a1ce8ba3ae615/likes').expect(401);
  });

  it('sends list of users who liked the post as response', async () => {
    await request(app)
      .get('/posts/6324d197ac8a1ce8ba3ae614/likes')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .expect(200)
      .expect((response) => {
        expect(response.body.likes.length).toBe(3);
        expect(response.body.count).toBe(3);
      });
  });
});

describe('likes router POST method', () => {
  it('requires authentication', async () => {
    await request(app)
      .post('/posts/6324d197ac8a1ce8ba3ae613/likes')
      .expect(401);
  });

  it('adds user to list of likes', async () => {
    await request(app)
      .post('/posts/6324d197ac8a1ce8ba3ae613/likes')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .expect(200)
      .expect((response) => {
        const { like } = response.body;
        expect(like.post.toString()).toBe('6324d197ac8a1ce8ba3ae613');
        expect(fakeUsers[0]._id.equals(like.author._id)).toBe(true);
      });
  });

  it('does not allow user to like post twice', async () => {
    await request(app)
      .post('/posts/6324d197ac8a1ce8ba3ae613/likes')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .expect(200);
    await request(app)
      .post('/posts/6324d197ac8a1ce8ba3ae613/likes')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .expect(400);
  });
});

describe('likes router DELETE method', () => {
  it('requires authentication', async () => {
    await request(app)
      .delete('/posts/6324d197ac8a1ce8ba3ae613/likes')
      .expect(401);
  });

  it('removes like from post', async () => {
    expect(
      await Like.findOne({
        post: '6324d197ac8a1ce8ba3ae614',
        author: fakeUsers[0]._id,
      }),
    ).toBeTruthy();
    await request(app)
      .delete('/posts/6324d197ac8a1ce8ba3ae614/likes')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .expect(200);
    expect(
      await Like.findOne({
        post: '6324d197ac8a1ce8ba3ae614',
        author: fakeUsers[0]._id,
      }),
    ).toBeFalsy();
  });

  it('responds with 400 if user has not liked the post', async () => {
    await request(app)
      .delete('/posts/6324d197ac8a1ce8ba3ae613/likes')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .expect(400);
  });
});
