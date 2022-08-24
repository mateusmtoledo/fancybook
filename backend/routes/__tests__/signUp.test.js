const request = require('supertest');
const User = require('../../models/User');
const app = require('../../testingServer');

const signUpRouter = require('../signUp');

app.use('/sign-up', signUpRouter);

const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@fancybook.com',
  password: 'johndoe123',
};

describe('signUp route', () => {
  it('responds with json', (done) => {
    request(app)
      .post('/sign-up')
      .send(userData)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.firstName).toBe('John');
        expect(response.body.lastName).toBe('Doe');
        expect(response.body.email).toBe('johndoe@fancybook.com');
        done();
      })
      .catch((err) => done(err));
  });

  it('adds user to database', (done) => {
    request(app)
      .post('/sign-up')
      .send(userData)
      .then(() => {
        User
          .findOne({ email: 'johndoe@fancybook.com' })
          .select('+password')
          .then((user) => {
            expect(user).not.toBeNull();
            expect(user.password).not.toBe('johndoe123');
            done();
          });
      })
      .catch((err) => done(err));
  });

  it('does not add user if email is not unique', (done) => {
    const userDataWithSameEmail = 'firstName=NotJohn&lastName=NotDoe&email=johndoe@fancybook.com&password=notjohndoe123';
    request(app)
      .post('/sign-up')
      .send(userData)
      .then(() => {
        request(app)
          .post('/sign-up')
          .send(userDataWithSameEmail)
          .then((response) => {
            expect(response.status).not.toBe(200);
            User.find({ email: 'johndoe@fancybook.com' }).then((users) => {
              expect(users.length).toBe(1);
              done();
            });
          });
      })
      .catch((err) => done(err));
  });
});
