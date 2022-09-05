const request = require('supertest');
const app = require('../../app');
const { fakeUsers } = require('../../database/seeding/fakeUsersAndFriends');
const User = require('../../models/User');

beforeEach(async () => {
  await User.insertMany(fakeUsers);
});

describe('friends route', () => {
  it('requires authentication', async () => {
    await request(app)
      .get(`/users/${fakeUsers[0]._id.str}/friends`)
      .expect(401);
  });

  it('does not send user\'s requests to other users', async () => {
    await request(app)
      .get(`/users/${fakeUsers[2]._id}/friends`)
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .expect((response) => {
        expect(response.body.friends.length).toBe(2);
        expect(response.body).not.toHaveProperty('pending');
        expect(response.body).not.toHaveProperty('sent');
      });
  });

  it('sends user\'s requests on /me route', async () => {
    await request(app)
      .get('/users/me/friends')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .expect((response) => {
        expect(response.body.friends.length).toBe(2);
        expect(response.body.pending.length).toBe(1);
        expect(response.body.sent.length).toBe(1);
      });
  });
});
