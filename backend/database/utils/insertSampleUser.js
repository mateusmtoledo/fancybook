const User = require('../../models/User');
const { generateRandomUser } = require('../seeding/fakeDataGenerator');
const avatars = require('../seeding/avatars.json');

async function insertSampleUser() {
  const avatarIndex =
    avatars.length > 50
      ? Math.floor(Math.random() * (avatars.length - 50)) + 50
      : Math.floor(Math.random() * avatars.length);
  const allSampleUsers = await User.find({ sample: true });
  const newSampleUser = await new User(generateRandomUser(avatarIndex)).save();

  if (!allSampleUsers.length) return newSampleUser;

  const numberOfFriends = 36;
  const randomFriends = allSampleUsers
    .map((user) => ({ user, shuffleIndex: Math.random() }))
    .sort((a, b) => a.shuffleIndex - b.shuffleIndex)
    .map((item) => item.user)
    .slice(0, numberOfFriends);

  const possibleStatus = [
    ['friends', 'friends'],
    ['sent', 'pending'],
    ['pending', 'sent'],
  ];

  randomFriends.forEach((friend, index) => {
    const statusIndex = Math.floor((index * 3) / randomFriends.length);
    friend.friendList.push({
      user: newSampleUser._id,
      status: possibleStatus[statusIndex][0],
    });
    newSampleUser.friendList.push({
      user: friend._id,
      status: possibleStatus[statusIndex][1],
    });
  });
  await User.bulkSave([newSampleUser, ...randomFriends]);
  const insertedUser = await User.findById(newSampleUser._id);
  return insertedUser;
}

module.exports = insertSampleUser;
