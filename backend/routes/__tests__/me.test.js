const request = require('supertest');
const bcrypt = require('bcryptjs');
const { fakeUsers } = require('../../database/seeding/fakeUsersAndFriends');
const User = require('../../models/User');
const app = require('../../app');

const superLongText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ullamcorper aliquet. Etiam dictum ut leo a dictum. Nulla congue rhoncus enim nec lacinia. Pellentesque id ultrices mi. Etiam suscipit a mi at feugiat. Fusce et sapien quis sapien blandit feugiat sed et urna. Praesent quis ante in nisi euismod hendrerit. Donec non diam vel urna ultricies tincidunt. Donec venenatis lectus nec lacus ultrices, ac posuere purus dictum. Nam eleifend, risus eu malesuada sollicitudin, erat nisi rutrum urna, rutrum facilisis arcu purus ut lacus. Vestibulum ornare lorem vel dolor feugiat, non egestas ipsum mollis. Etiam vitae arcu vitae elit varius iaculis eu at lacus. Duis scelerisque leo et tincidunt maximus. Integer quis augue purus. Nulla accumsan metus purus, at dictum ex mollis at. Aenean nec sagittis ipsum. Nam viverra mauris eget malesuada dignissim. Sed venenatis ex vitae eleifend ultrices. Vivamus finibus mauris vel enim molestie, sed gravida diam dignissim. Aliquam erat volutpat. Sed sapien nulla, luctus ut suscipit cursus, aliquam non enim. Aliquam malesuada sapien mauris, sed volutpat lectus hendrerit quis. Etiam et blandit purus, quis feugiat lacus. Nam congue interdum nulla vitae molestie. Praesent imperdiet ullamcorper elementum. In scelerisque in turpis ut suscipit. Vestibulum mattis justo et urna egestas lacinia. Nam vitae dolor nibh. Aenean iaculis accumsan odio, tincidunt cursus urna laoreet non. Ut tempor mauris odio. Praesent ut est interdum, fringilla nibh varius, auctor mi. Donec eu lorem faucibus, scelerisque enim ac, mattis sapien. Nam egestas nec dui eget tempus. Phasellus molestie facilisis lectus at hendrerit. Duis lobortis libero leo, sit amet dapibus mauris suscipit sit amet. Aenean bibendum cursus orci, nec tincidunt tellus egestas at. Vivamus vitae velit maximus, feugiat dolor vel, facilisis quam. Fusce at massa laoreet, scelerisque ante a, condimentum dolor. Fusce velit nulla, tincidunt eu faucibus at, venenatis quis ante. Morbi ac nunc fringilla, commodo est sit amet, porttitor magna. Phasellus volutpat risus condimentum, molestie metus a, dapibus ex. Cras ut mi nec nisi vulputate porttitor. Morbi id molestie velit. Pellentesque non felis sem. Vivamus convallis vehicula ex ac sagittis. In eget pretium nisl, vitae hendrerit ipsum. Donec ultricies lobortis neque. Cras euismod lacus at ipsum bibendum consequat. Quisque mi ipsum, scelerisque vulputate velit quis, ultrices sollicitudin sapien. Donec ut ligula auctor, condimentum odio in, interdum purus. Aenean rhoncus pharetra leo eget sodales. Praesent volutpat gravida maximus. Maecenas ligula ligula, imperdiet id sapien volutpat, gravida varius urna. Mauris turpis arcu, interdum eu vehicula a, porta nec elit. Nam tristique viverra leo, a elementum leo congue ut. Nam finibus pellentesque lectus et dignissim. Cras sed quam felis. Donec a libero est. Fusce sagittis magna enim, nec sodales risus consequat vel. Curabitur at diam porta, lacinia orci nec, sollicitudin est. Pellentesque at accumsan lacus. Praesent a diam mi. Pellentesque mollis semper arcu et pretium. Duis purus nisi, dapibus facilisis facilisis non, congue eu massa. Mauris vestibulum pharetra ex, quis ultrices lorem laoreet eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce ultrices metus ut cursus hendrerit.';

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

  it('sends invalid fields as response', async () => {
    await request(app)
      .put('/users/me/name')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .send({
        firstName: '',
        lastName: '',
      })
      .expect(400)
      .expect((response) => {
        expect(response.body.invalidFields.firstName.msg).toBe(
          'First name must have 1 to 35 characters',
        );
        expect(response.body.invalidFields.lastName.msg).toBe(
          'Last name must have 1 to 35 characters',
        );
      });
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

  it('sends invalid fields as response', async () => {
    await request(app)
      .put('/users/me/bio')
      .auth(fakeUsers[0].authToken, { type: 'bearer' })
      .send({
        bio: superLongText,
      })
      .expect(400)
      .expect((response) => {
        expect(response.body.invalidFields.bio.msg).toBe(
          'Bio should have a maximum of 2048 characters',
        );
      });
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
