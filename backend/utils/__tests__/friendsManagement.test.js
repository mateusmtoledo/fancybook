const {
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend,
} = require('../friendsManagement');
const User = require('../../models/User');

const { fakeUsers } = require('../../database/seeding/fakeUsers');

require('../../database/config/mongoSetup');

beforeEach(async () => {
  await User.insertMany(fakeUsers);
});

describe('sendFriendRequest', () => {
  it('sends friend request', async () => {
    const users = await User.find().limit(2);
    await sendFriendRequest({
      from: users[0]._id,
      to: users[1]._id.toString(),
    });
    await User.find({ _id: { $in: [users[0]._id, users[1]._id] } }).then(
      (users) => {
        expect(users[0].friendList[0].status).toBe('sent');
        expect(users[1].friendList[0].status).toBe('pending');
      },
    );
  });

  it('throws error if users are friends or there is a pending request', async () => {
    const users = await User.find().limit(2);
    await sendFriendRequest({
      from: users[0]._id,
      to: users[1]._id.toString(),
    });
    await expect(async () =>
      sendFriendRequest({ from: users[0]._id, to: users[1]._id.toString() }),
    ).rejects.toThrowError();
    await User.find({ _id: { $in: [users[0]._id, users[1]._id] } }).then(
      (users) => {
        expect(users[0].friendList.length).toBe(1);
        expect(users[1].friendList.length).toBe(1);
        expect(users[0].friendList[0].status).toBe('sent');
        expect(users[1].friendList[0].status).toBe('pending');
      },
    );
  });
});

describe('acceptFriendRequest', () => {
  it('accepts a friend request', async () => {
    const users = await User.find().limit(2);
    await sendFriendRequest({
      from: users[0]._id,
      to: users[1]._id.toString(),
    });
    await acceptFriendRequest({
      from: users[1]._id,
      to: users[0]._id.toString(),
    });
    await User.find({ _id: { $in: [users[0]._id, users[1]._id] } }).then(
      (users) => {
        expect(users[0].friendList[0].status).toBe('friends');
        expect(users[1].friendList[0].status).toBe('friends');
      },
    );
  });

  it('throws error if users are already friends', async () => {
    const users = await User.find().limit(2);
    await sendFriendRequest({
      from: users[0]._id,
      to: users[1]._id.toString(),
    });
    await acceptFriendRequest({
      from: users[1]._id,
      to: users[0]._id.toString(),
    });
    expect(async () =>
      acceptFriendRequest({ from: users[0]._id, to: users[1]._id.toString() }),
    ).rejects.toThrowError();
    expect(async () =>
      acceptFriendRequest({ from: users[1]._id, to: users[0]._id.toString() }),
    ).rejects.toThrowError();
    await User.find({ _id: { $in: [users[0]._id, users[1]._id] } }).then(
      (users) => {
        expect(users[0].friendList[0].status).toBe('friends');
        expect(users[1].friendList[0].status).toBe('friends');
      },
    );
  });

  it('throws error if user does not have a pending request', async () => {
    const users = await User.find().limit(2);
    await sendFriendRequest({
      from: users[0]._id,
      to: users[1]._id.toString(),
    });
    expect(async () =>
      acceptFriendRequest({ from: users[0]._id, to: users[1]._id.toString() }),
    ).rejects.toThrowError();
    await User.find({ _id: { $in: [users[0]._id, users[1]._id] } }).then(
      (users) => {
        expect(users[0].friendList[0].status).toBe('sent');
        expect(users[1].friendList[0].status).toBe('pending');
      },
    );
  });
});

describe('removeFriend', () => {
  it('removes users from both friendLists', async () => {
    const users = await User.find().limit(2);
    await sendFriendRequest({
      from: users[0]._id,
      to: users[1]._id.toString(),
    });
    await removeFriend({ from: users[0]._id, to: users[1]._id.toString() });
    await User.find({ _id: { $in: [users[0]._id, users[1]._id] } }).then(
      (users) => {
        expect(users[0].friendList.length).toBe(0);
        expect(users[1].friendList.length).toBe(0);
      },
    );
  });
});
