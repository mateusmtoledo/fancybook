const request = require('supertest');
const { app } = require('../../functions/app');
const User = require('../../models/User');

describe('/login/sample route', () => {
  describe('POST', () => {
    it('saves new user in the database', async () => {
      await request(app).post('/login/sample').expect(200);
      expect((await User.find()).length).toBe(1);
    });

    it('sends set-cookie header with session id as POST response', async () => {
      await request(app)
        .post('/login/sample')
        .expect(200)
        .then((response) => {
          expect(typeof response.headers['set-cookie'][0]).toBe('string');
          expect(response.headers['set-cookie'][0]).toMatch(/^connect.sid=/);
        });
    });
  });
});
