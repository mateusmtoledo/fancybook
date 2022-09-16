const User = require('../models/User');

exports.sendFriendRequest = async ({ from, to }) => {
  if (from === to || from.equals(to)) {
    throw new Error('Users can\'t send friend requests to themselves');
  }
  const requester = await User.findById(from);
  const recipient = await User.findById(to);
  if (requester
    .friendList
    .some((friendship) => friendship.user.equals(to._id))
  ) {
    throw new Error('Users are already friends or there is a pending request');
  }

  requester.friendList.push({
    user: recipient._id,
    status: 'sent',
  });
  recipient.friendList.push({
    user: requester._id,
    status: 'pending',
  });
  return Promise.all([requester.save(), recipient.save()]);
};

exports.acceptFriendRequest = async ({ from, to }) => {
  const requester = await User.findById(from);
  const recipient = await User.findById(to);
  const friendshipFrom = requester
    .friendList
    .find((friendship) => friendship.user.equals(recipient._id));
  const friendshipTo = recipient
    .friendList
    .find((friendship) => friendship.user.equals(requester._id));
  if (!friendshipFrom || friendshipFrom.status === 'sent') {
    throw new Error('There is no pending request');
  }
  if (friendshipFrom.status === 'pending') {
    friendshipFrom.status = 'friends';
    friendshipTo.status = 'friends';
    return Promise.all([requester.save(), recipient.save()]);
  }
  throw new Error('Users are friends already');
};

exports.removeFriend = async ({ from, to }) => {
  const requester = await User.findById(from);
  const recipient = await User.findById(to);
  const friendshipFromIndex = requester.friendList
    .findIndex((friendship) => friendship.user.equals(recipient._id));
  const friendshipToIndex = recipient.friendList
    .findIndex((friendship) => friendship.user.equals(requester._id));
  if (friendshipFromIndex === -1) {
    throw new Error('There\'s no friendship between the users');
  }
  requester.friendList.splice(friendshipFromIndex, 1);
  recipient.friendList.splice(friendshipToIndex, 1);
  return Promise.all([requester.save(), recipient.save()]);
};
