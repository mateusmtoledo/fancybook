const User = require('../../../models/User');
const { fakeUsers } = require('../../seeding/fakeUsersAndFriends');
const insertSampleUser = require('../insertSampleUser');

require('../../config/mongoSetup');

describe('insertSampleUser', () => {
  it('returns sample user', async () => {
    const sampleUser = await insertSampleUser();
    expect(sampleUser).toHaveProperty('_id');
    expect(sampleUser).toHaveProperty('email');
    expect(sampleUser).toHaveProperty('username');
    expect(sampleUser).toHaveProperty('firstName');
    expect(sampleUser).toHaveProperty('lastName');
    expect(sampleUser).toHaveProperty('bio');
    expect(sampleUser).toHaveProperty('avatar');
  });

  describe('generated user', () => {
    it('is saved in the database', async () => {
      const sampleUser = await insertSampleUser();
      const savedUser = await User.findById(sampleUser._id);
      expect(savedUser).not.toBeNull();
    });

    it('has other sample user(s) as friends', async () => {
      await User.insertMany(
        fakeUsers.map((fakeUser) => ({ ...fakeUser, sample: true })),
      );
      const sampleUser = await insertSampleUser();
      expect(sampleUser.friendList.length).not.toBe(0);
    });
  });
});
