const request = require('supertest');
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
      .attach('avatar', `${__dirname}/__mocks__/avatarFileMock.png`)
      .expect(200)
      .expect((response) => {
        expect(response.body.user.avatar).toBe('https://someurl.com/w_256,h_256,c_fill/path/image.png');
      });
  });
});
