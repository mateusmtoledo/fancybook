const request = require('supertest');
const { app } = require('../../functions/app');
const User = require('../../models/User');
const { fakeUsers } = require('../../database/seeding/fakeUsers');
const getSessionId = require('../../jest/utils/getSessionId');

const users = [fakeUsers[0], fakeUsers[1]];

let sid;

beforeEach(async () => {
  await User.insertMany(users);
  sid = await getSessionId(app, {
    email: fakeUsers[0].email,
    password: fakeUsers[0].plainTextPassword,
  });
});

describe('users route GET method', () => {
  it('sends users whose names match query', async () => {
    await request(app)
      .get('/users?search=oHn dO')
      .set('Cookie', `connect.sid=${sid}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.users.length).toBe(1);
        expect(response.body.users[0].firstName).toBe('John');
      });
  });
});

describe('GET users/:userId route', () => {
  it('is protected', async () => {
    await request(app).get(`/users/${users[1]._id}`).expect(401);
  });

  it("sends user's publicly available info", async () => {
    await request(app)
      .get(`/users/${users[1]._id}`)
      .set('Cookie', `connect.sid=${sid}`)
      .expect(200)
      .expect((response) => {
        const { user } = response.body;
        expect(user).toMatchObject({
          firstName: 'Jane',
          lastName: 'Doe',
        });
        expect(user).not.toHaveProperty('friendList');
        expect(user).not.toHaveProperty('password');
      });
  });
});
