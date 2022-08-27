const request = require('supertest');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
// const app = require('../../testingServer');
const app = require('../../app');

const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@fancybook.com',
  password: 'johndoe123',
};

beforeEach(async () => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  await new User({ ...userData, password: hashedPassword }).save();
});

describe('login route', () => {
  it('sends jwt as POST response', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'johndoe@fancybook.com',
        password: 'johndoe123',
      })
      .expect(200)
      .then((response) => {
        expect(response.body.token).toBeTruthy();
        done();
      })
      .catch((err) => done(err));
  });
});
