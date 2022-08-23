const { initializeMongoServer, resetDb, disconnectMongoose } = require('../config/mongoTestingConfig');
const { generateRandomUser } = require('../seeding/fakeData');
const { addFriend } = require('../operations/friendsManager');
const User = require('../models/User');

const fakeUsers = new Array(10).fill().map(() => generateRandomUser());
let mongoServer;

beforeAll(async () => {
  mongoServer = await initializeMongoServer();
});
beforeEach(async () => {
  await User.insertMany(fakeUsers);
});
afterEach(async () => {
  await resetDb();
});
afterAll(async () => {
  await disconnectMongoose(mongoServer);
});

describe('addFriend', () => {
  it('sends friend request', async () => {
    const userIds = await (await User.find().limit(2)).map((user) => user._id);
    await addFriend(...userIds);
    await User.find({ _id: { $in: [...userIds] } }).then((users) => {
      expect(users[0].friendList[0].status).toBe('sent');
      expect(users[1].friendList[0].status).toBe('pending');
    });
  });

  it('throws error if user tries to send request twice', async () => {
    const userIds = await (await User.find().limit(2)).map((user) => user._id);
    await addFriend(...userIds);
    await expect(addFriend(...userIds)).rejects.toThrowError();
    await User.find({ _id: { $in: [...userIds] } }).then((users) => {
      expect(users[0].friendList[0].status).toBe('sent');
      expect(users[1].friendList[0].status).toBe('pending');
    });
  });

  it('accepts friendship if users sent requests to each other', async () => {
    const userIds = await (await User.find().limit(2)).map((user) => user._id);
    await addFriend(userIds[0], userIds[1]);
    await addFriend(userIds[1], userIds[0]);
    await User.find({ _id: { $in: [...userIds] } }).then((users) => {
      expect(users[0].friendList[0].status).toBe('friends');
      expect(users[1].friendList[0].status).toBe('friends');
    });
  });

  it('throws error if users are already friends', async () => {
    const userIds = await (await User.find().limit(2)).map((user) => user._id);
    await addFriend(userIds[0], userIds[1]);
    await addFriend(userIds[1], userIds[0]);
    expect(addFriend(userIds[1], userIds[0])).rejects.toThrowError();
    await User.find({ _id: { $in: [...userIds] } }).then((users) => {
      expect(users[0].friendList[0].status).toBe('friends');
      expect(users[1].friendList[0].status).toBe('friends');
    });
  });
});
