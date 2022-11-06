const request = require('supertest');
const User = require('../../models/User');
const app = require('../../app');

const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@fancybook.com',
  password: 'johndoe123',
};

describe('signUp route', () => {
  it('responds with json', async () => {
    await request(app)
      .post('/sign-up')
      .send(userData)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.firstName).toBe('John');
        expect(response.body.lastName).toBe('Doe');
        expect(response.body.email).toBe('johndoe@fancybook.com');
      });
  });

  it('adds user to database', async () => {
    await request(app).post('/sign-up').send(userData);
    await User.findOne({ email: 'johndoe@fancybook.com' })
      .select('+password')
      .then((user) => {
        expect(user).not.toBeNull();
        expect(user.password).not.toBe('johndoe123');
      });
  });

  it('does not add user if email is not unique', async () => {
    const userWithSameEmail = {
      firstName: 'NotJohn',
      lastName: 'NotDoe',
      email: 'johndoe@fancybook.com',
      password: 'notjohndoe123',
    };
    await request(app).post('/sign-up').send(userData);
    await request(app)
      .post('/sign-up')
      .send(userWithSameEmail)
      .expect((response) => {
        expect(response.status).not.toBe(200);
      });
    const usersWithGivenEmail = await User.find({
      email: 'johndoe@fancybook.com',
    });
    expect(usersWithGivenEmail.length).toBe(1);
  });
});
