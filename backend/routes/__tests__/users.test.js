const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../../testingServer');
const User = require('../../models/User');
const { addFriend } = require('../../databaseUtils/operations/friendsManager');

const loginRouter = require('../login');
const usersRouter = require('../users');

app.use('/login', loginRouter);
app.use('/users', usersRouter);

const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@fancybook.com',
  password: 'password123',
};

const secondUserData = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'janedoe@fancybook.com',
};

const users = [];
let token;

beforeEach(async () => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  users[0] = await new User({ ...userData, password: hashedPassword }).save();
  users[1] = await new User({ ...secondUserData, password: hashedPassword }).save();
  token = await request(app)
    .post('/login/')
    .send({
      email: userData.email,
      password: userData.password,
    })
    .then((response) => response.body.token);
});

describe('GET users/:userId route', () => {
  it('is protected', (done) => {
    request(app)
      .get(`/users/${users[1]._id}`)
      .expect(401, done);
  });

  it('responds with 401 if users are not friends', async () => {
    await addFriend(users[0]._id, users[1]._id);
    await request(app)
      .get(`/users/${users[1]._id}`)
      .auth(token, { type: 'bearer' })
      .expect(401);
  });

  it('works if users are friends', async () => {
    await addFriend(users[0]._id, users[1]._id);
    await addFriend(users[1]._id, users[0]._id);
    await request(app)
      .get(`/users/${users[1]._id}`)
      .auth(token, { type: 'bearer' })
      .expect((response) => {
        expect(response.status).toBe(200);
        expect(response.body.user).toMatchObject(secondUserData);
      });
  });
});
