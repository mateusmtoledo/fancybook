const { sendFriendRequest, acceptFriendRequest } = require('../operations/friendsManager');
const User = require('../../models/User');

const { fakeUsers } = require('../seeding/staticFakeUsers');

require('../config/mongoSetup');

beforeEach(async () => {
  await User.insertMany(fakeUsers);
});

describe('sendFriendRequest', () => {
  it('sends friend request', async () => {
    const users = await User.find().limit(2);
    await sendFriendRequest({ from: users[0], to: users[1] });
    await User.find({ _id: { $in: [users[0]._id, users[1]._id] } }).then((users) => {
      expect(users[0].friendList[0].status).toBe('sent');
      expect(users[1].friendList[0].status).toBe('pending');
    });
  });

  it('throws error if users are friends or there is a pending request', async () => {
    const users = await User.find().limit(2);
    await sendFriendRequest({ from: users[0], to: users[1] });
    await expect(
      async () => sendFriendRequest({ from: users[0], to: users[1] }),
    ).rejects.toThrowError();
    await User.find({ _id: { $in: [users[0]._id, users[1]._id] } }).then((users) => {
      expect(users[0].friendList[0].status).toBe('sent');
      expect(users[1].friendList[0].status).toBe('pending');
    });
  });
});

describe('acceptFriendRequest', () => {
  it('accepts a friend request', async () => {
    const users = await User.find().limit(2);
    await sendFriendRequest({ from: users[0], to: users[1] });
    await acceptFriendRequest({ from: users[1], to: users[0] });
    await User.find({ _id: { $in: [users[0]._id, users[1]._id] } }).then((users) => {
      expect(users[0].friendList[0].status).toBe('friends');
      expect(users[1].friendList[0].status).toBe('friends');
    });
  });

  it('throws error if users are already friends', async () => {
    const users = await User.find().limit(2);
    await sendFriendRequest({ from: users[0], to: users[1] });
    await acceptFriendRequest({ from: users[1], to: users[0] });
    expect(
      async () => acceptFriendRequest({ from: users[0], to: users[1] }),
    ).rejects.toThrowError();
    expect(
      async () => acceptFriendRequest({ from: users[1], to: users[0] }),
    ).rejects.toThrowError();
    await User.find({ _id: { $in: [users[0]._id, users[1]._id] } }).then((users) => {
      expect(users[0].friendList[0].status).toBe('friends');
      expect(users[1].friendList[0].status).toBe('friends');
    });
  });

  it('throws error if user does not have a pending request', async () => {
    const users = await User.find().limit(2);
    await sendFriendRequest({ from: users[0], to: users[1] });
    expect(
      async () => acceptFriendRequest({ from: users[0], to: users[1] }),
    ).rejects.toThrowError();
    await User.find({ _id: { $in: [users[0]._id, users[1]._id] } }).then((users) => {
      expect(users[0].friendList[0].status).toBe('sent');
      expect(users[1].friendList[0].status).toBe('pending');
    });
  });
});
