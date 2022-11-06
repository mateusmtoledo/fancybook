const request = require('supertest');
const bcrypt = require('bcryptjs');
const { fakeUsers } = require('../../database/seeding/fakeUsersAndFriends');
const User = require('../../models/User');
const app = require('../../app');

jest.mock('cloudinary');

beforeEach(async () => {
  await User.insertMany(fakeUsers);
});

describe('PUT /avatar', () => {
  it('allows user to upload their own avatar', async () => {
    await request(app)
      .put('/users/me/avatar')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .send({ avatar: 'base64string' })
      .expect(200)
      .expect((response) => {
        expect(response.body.user.avatar).toBe(
          'https://someurl.com/w_256,h_256,c_fill/path/image.png',
        );
      });
  });
});

describe('PUT /name', () => {
  it('allows user to update their name', async () => {
    await request(app)
      .put('/users/me/name')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .send({
        firstName: 'Notjohn',
        lastName: 'Notdoe',
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.user.firstName).toBe('Notjohn');
        expect(response.body.user.lastName).toBe('Notdoe');
      });
    const user = await User.findById(fakeUsers[0]._id);
    expect(user.firstName).toBe('Notjohn');
    expect(user.lastName).toBe('Notdoe');
  });
});

describe('PUT /bio', () => {
  it('allows user to update their profile info', async () => {
    await request(app)
      .put('/users/me/bio')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .send({
        bio: 'I am john doe',
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.user.bio).toBe('I am john doe');
      });
    const user = await User.findById(fakeUsers[0]._id);
    expect(user.bio).toBe('I am john doe');
  });
});

describe('PUT /email', () => {
  it('allows user to update their email', async () => {
    await request(app)
      .put('/users/me/email')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .send({
        email: 'notjohndoe@fancybook.com',
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.user.email).toBe('notjohndoe@fancybook.com');
      });
    const user = await User.findById(fakeUsers[0]._id);
    expect(user.email).toBe('notjohndoe@fancybook.com');
  });

  it('checks if email is already in use', async () => {
    await request(app)
      .put('/users/me/email')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .send({
        email: 'janedoe@fancybook.com',
      })
      .expect(400)
      .expect((response) => {
        const { invalidFields } = response.body;
        expect(invalidFields.email.msg).toMatch(/email is already in use/i);
      });
    const user = await User.findById(fakeUsers[0]._id);
    expect(user.email).toBe('johndoe@fancybook.com');
  });
});

describe('PUT /password', () => {
  it('checks if provided current password is correct', async () => {
    await request(app)
      .put('/users/me/password')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .send({
        password: 'Wrongpassword123',
        newPassword: 'Attemptednewpassword123',
      })
      .expect(400);
    const user = await User.findById(fakeUsers[0]._id, 'password');
    expect(user.password).toBe(fakeUsers[0].password);
  });

  it('allows user to update their password', async () => {
    await request(app)
      .put('/users/me/password')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .send({
        password: fakeUsers[0].plainTextPassword,
        newPassword: 'Johnsnewpassword123',
      })
      .expect(200);
    const user = await User.findById(fakeUsers[0]._id, 'password');
    const res = await bcrypt.compare('Johnsnewpassword123', user.password);
    expect(res).toBe(true);
  });
});
