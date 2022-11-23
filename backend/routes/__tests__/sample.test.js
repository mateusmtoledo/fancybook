const request = require('supertest');
const app = require('../../app');
const { fakeUsers } = require('../../database/seeding/fakeUsers');
const User = require('../../models/User');

beforeEach(async () => {
  await User.insertMany(fakeUsers);
});

describe('/login/sample route', () => {
  describe('POST', () => {
    it('saves new user in the database', async () => {
      await request(app).post('/login/sample').expect(200);
      const numberOfUsers = await User.countDocuments();
      expect(numberOfUsers).toBe(fakeUsers.length + 1);
    });

    it('sends token as response', async () => {
      await request(app)
        .post('/login/sample')
        .expect(200)
        .then((response) => {
          const token = response.body?.token;
          expect(typeof token).toBe('string');
          expect(token.length).not.toBe(0);
        });
    });
  });
});
