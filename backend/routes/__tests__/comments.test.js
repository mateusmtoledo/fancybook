const request = require('supertest');
const { app } = require('../../functions/app');
const { fakeUsers } = require('../../database/seeding/fakeUsers');
const { fakePosts } = require('../../database/seeding/fakePosts');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
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

describe('comments route GET method', () => {
  it('requires authentication', async () => {
    await request(app).get(`/posts/${fakePosts[0]._id}/comments`).expect(401);
  });

  it('responds with 200 when user is successfully authenticated', async () => {
    await request(app)
      .get(`/posts/${fakePosts[0]._id}/comments`)
      .set('Cookie', `connect.sid=${sid}`)
      .expect(200);
  });

  it('sends comments and count as response', async () => {
    const postWithComments = await Post.findOne({ author: fakeUsers[3]._id });
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
    await request(app)
      .get(`/posts/${postWithComments._id}/comments`)
      .set('Cookie', `connect.sid=${sid}`)
      .expect(200)
      .expect((response) => {
        const data = response.body;
        expect(data.comments.length).toBe(2);
        expect(data.count).toBe(2);
        expect(data.hasNextPage).toBe(false);
      });
  });
});

describe('comments route POST method', () => {
  it('requires authentication', async () => {
    await request(app).post(`/posts/${fakePosts[0]._id}/comments`).expect(401);
  });

  it('adds comment to the database', async () => {
    await request(app)
      .post(`/posts/${fakePosts[0]._id}/comments`)
      .set('Cookie', `connect.sid=${sid}`)
      .send({
        text: 'I love fancybook!',
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.comment.text).toBe('I love fancybook!');
      });
    const savedComment = await Comment.findOne({ text: 'I love fancybook!' });
    expect(savedComment.author.equals(fakeUsers[0]._id)).toBe(true);
  });

  it('responds with 400 when text has less than 3 characters', async () => {
    await request(app)
      .post(`/posts/${fakePosts[0]._id}/comments`)
      .set('Cookie', `connect.sid=${sid}`)
      .send({
        text: 'Aa',
      })
      .expect(400)
      .expect((response) => {
        expect(response.body.invalidFields.text.msg).toBe(
          'Comment must have at least 3 characters',
        );
      });
  });
});
