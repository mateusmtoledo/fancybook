const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
// const { addFriend } = require('../../database/operations/friendsManager');

const userData = {
  _id: new mongoose.Types.ObjectId('6311384d39fcee4794f5678c'),
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@fancybook.com',
  password: '$2a$10$BuRk3gm7dhNDRHPQq5VRkO.M5x9Lx2g/u6Md4FL1FISS.G/FRGK4u',
  plainTextPassword: 'pAssWord&4r(3*',
  authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzExMzg0ZDM5ZmNlZTQ3OTRmNTY3OGMiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJhdmF0YXIiOiJodHRwczovL2Nkbi5waXhhYmF5LmNvbS9waG90by8yMDE1LzEwLzA1LzIyLzM3L2JsYW5rLXByb2ZpbGUtcGljdHVyZS05NzM0NjBfOTYwXzcyMC5wbmciLCJlbWFpbCI6ImpvaG5kb2VAZmFuY3lib29rLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEJ1UmszZ203ZGhORFJIUFFxNVZSa08uTTV4OUx4MmcvdTZNZDRGTDFGSVNTLkcvRlJHSzR1Iiwic2FtcGxlIjpmYWxzZSwiZnJpZW5kTGlzdCI6W10sIl9fdiI6MCwiaWF0IjoxNjYyMDc0NzAyfQ.3PlU6QL8_N1HBTzp7jb_s7tKK3uPYNpJ35nSPWB9qqE',
};

const secondUserData = {
  _id: new mongoose.Types.ObjectId('63114a15ee51f867417b3d8a'),
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'janedoe@fancybook.com',
  password: '$2a$10$BuRk3gm7dhNDRHPQq5VRkO.M5x9Lx2g/u6Md4FL1FISS.G/FRGK4u',
  plainTextPassword: 'pAssWord&4r(3*',
};

const users = [userData, secondUserData];

beforeEach(async () => {
  await User.insertMany(users);
});

describe('GET users/:userId route', () => {
  it('is protected', async () => {
    await request(app)
      .get(`/users/${users[1]._id}`)
      .expect(401);
  });

  it('sends user\'s publicly available info', async () => {
    // await addFriend(users[0]._id, users[1]._id);
    await request(app)
      .get(`/users/${users[1]._id}`)
      .auth(userData.authToken, { type: 'bearer' })
      .expect(200)
      .expect((response) => {
        const { user } = response.body;
        expect(user).toMatchObject({
          firstName: 'Jane',
          lastName: 'Doe',
        });
        expect(user).not.toHaveProperty('friendList');
        expect(user).not.toHaveProperty('password');
      });
  });

  // it('sends full result if users are friends', async () => {
  //   await addFriend(users[0]._id, users[1]._id);
  //   await addFriend(users[1]._id, users[0]._id);
  //   await request(app)
  //     .get(`/users/${users[1]._id}`)
  //     .auth(token, { type: 'bearer' })
  //     .expect((response) => {
  //       expect(response.status).toBe(200);
  //       const { user } = response.body;
  //       expect(user).toMatchObject({
  //         firstName: 'Jane',
  //         lastName: 'Doe',
  //       });
  //       expect(user.friendList[0].user.str).toBe(users[0]._id.str);
  //       expect(user).not.toHaveProperty('email');
  //     });
  // });
});
