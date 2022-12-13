const request = require('supertest');
const User = require('../../models/User');
const app = require('../../app');
const { fakeUsers } = require('../../database/seeding/fakeUsers');

const userData = fakeUsers[0];

beforeEach(async () => {
  await new User(userData).save();
});

describe('login route', () => {
  it('sends set-cookie header with session id as POST response', async () => {
    await request(app)
      .post('/login')
      .send({
        email: 'johndoe@fancybook.com',
        password: 'pAssWord&4r(3*',
      })
      .expect(200)
      .then((response) => {
        expect(typeof response.headers['set-cookie'][0]).toBe('string');
        expect(response.headers['set-cookie'][0]).toMatch(/^connect.sid=/);
      });
  });

  it('sends json with invalid fields', async () => {
    await request(app)
      .post('/login')
      .send({
        email: '',
        password: '',
      })
      .expect(400)
      .then((response) => {
        expect(response.body.invalidFields.email.msg).toBe('Email is required');
        expect(response.body.invalidFields.password.msg).toBe(
          'Password is required',
        );
      });
  });
});
