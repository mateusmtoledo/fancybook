const mongoose = require('mongoose');
const request = require('supertest');
const User = require('../../models/User');
const app = require('../../app');

const userData = {
  _id: new mongoose.Types.ObjectId('6311384d39fcee4794f5678c'),
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@fancybook.com',
  password: '$2a$10$BuRk3gm7dhNDRHPQq5VRkO.M5x9Lx2g/u6Md4FL1FISS.G/FRGK4u',
  plainTextPassword: 'pAssWord&4r(3*',
  authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzExMzg0ZDM5ZmNlZTQ3OTRmNTY3OGMiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJhdmF0YXIiOiJodHRwczovL2Nkbi5waXhhYmF5LmNvbS9waG90by8yMDE1LzEwLzA1LzIyLzM3L2JsYW5rLXByb2ZpbGUtcGljdHVyZS05NzM0NjBfOTYwXzcyMC5wbmciLCJlbWFpbCI6ImpvaG5kb2VAZmFuY3lib29rLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEJ1UmszZ203ZGhORFJIUFFxNVZSa08uTTV4OUx4MmcvdTZNZDRGTDFGSVNTLkcvRlJHSzR1Iiwic2FtcGxlIjpmYWxzZSwiZnJpZW5kTGlzdCI6W10sIl9fdiI6MCwiaWF0IjoxNjYyMDc0NzAyfQ.3PlU6QL8_N1HBTzp7jb_s7tKK3uPYNpJ35nSPWB9qqE',
};

beforeEach(async () => {
  await new User(userData).save();
});

describe('login route', () => {
  it('sends jwt as POST response', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'johndoe@fancybook.com',
        password: 'pAssWord&4r(3*',
      })
      .expect(200)
      .then((response) => {
        expect(typeof response.body.token).toBe('string');
        expect(response.body.token.length).not.toBe(0);
        done();
      })
      .catch((err) => done(err));
  });
});
