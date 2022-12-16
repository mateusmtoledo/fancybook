const request = require('supertest');
const { app } = require('../../functions/app');
const User = require('../../models/User');
const { fakeUsers } = require('../../database/seeding/fakeUsers');
const getSessionId = require('../../jest/utils/getSessionId');

let sid;

beforeEach(async () => {
  await new User(fakeUsers[0]).save();
  sid = await getSessionId(app, {
    email: fakeUsers[0].email,
    password: fakeUsers[0].plainTextPassword,
  });
});

describe('logout route', () => {
  describe('POST method', () => {
    it('logs user out', async () => {
      await request(app)
        .get('/login')
        .set('Cookie', `connect.sid=${sid}`)
        .expect(200);
      await request(app)
        .post('/logout')
        .set('Cookie', `connect.sid=${sid}`)
        .expect(200);
      await request(app)
        .post('/login')
        .set('Cookie', `connect.sid=${sid}`)
        .expect(400);
    });
  });
});
