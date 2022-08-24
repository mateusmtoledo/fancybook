const request = require('supertest');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const app = require('../../testingServer');

const loginRouter = require('../login');

app.use('/login', loginRouter);

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
  it('sends jwt and user as POST response', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'johndoe@fancybook.com',
        password: 'johndoe123',
      })
      .expect(200)
      .then((response) => {
        const expectedUser = { ...userData };
        delete expectedUser.password;

        expect(response.body.token).toBeTruthy();
        expect(response.body.user).toMatchObject(expectedUser);
        console.log(response.body.user);
        done();
      })
      .catch((err) => done(err));
  });
});
