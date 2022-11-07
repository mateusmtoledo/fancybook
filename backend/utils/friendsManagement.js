const { default: mongoose } = require('mongoose');
const User = require('../models/User');

class BadRequestError extends Error {
  constructor({ msg, friendshipStatus }) {
    super(msg);
    this.statusCode = 400;
    this.friendshipStatus = friendshipStatus;
  }
}

exports.sendFriendRequest = async ({ from, to }) => {
  const fromId = new mongoose.Types.ObjectId(from);
  const toId = new mongoose.Types.ObjectId(to);
  if (fromId.equals(toId)) {
    throw new BadRequestError({
      msg: "Users can't send friend requests to themselves",
    });
  }
  const requester = await User.findById(fromId);
  const recipient = await User.findById(toId);
  if (!requester || !recipient) {
    throw new BadRequestError({
      msg: 'User not found',
    });
  }
  if (
    requester.friendList.some((friendship) =>
      friendship.user.equals(recipient._id),
    )
  ) {
    throw new BadRequestError({
      msg: 'Users are already friends or there is a pending request',
      friendshipStatus: requester.friendList.find((friendship) =>
        friendship.user.equals(recipient._id),
      )?.status,
    });
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
  const fromId = new mongoose.Types.ObjectId(from);
  const toId = new mongoose.Types.ObjectId(to);
  if (fromId.equals(toId)) {
    throw new BadRequestError({
      msg: "Users can't send friend requests to themselves",
    });
  }
  const requester = await User.findById(fromId);
  const recipient = await User.findById(toId);
  if (!requester || !recipient) {
    throw new BadRequestError({
      msg: 'User not found',
    });
  }
  const friendshipFrom = requester.friendList.find((friendship) =>
    friendship.user.equals(recipient._id),
  );
  const friendshipTo = recipient.friendList.find((friendship) =>
    friendship.user.equals(requester._id),
  );
  if (!friendshipFrom || friendshipFrom.status === 'sent') {
    throw new BadRequestError({
      msg: 'There is no pending request',
      friendshipStatus: requester.friendList.find((friendship) =>
        friendship.user.equals(recipient._id),
      )?.status,
    });
  }
  if (friendshipFrom.status === 'pending') {
    friendshipFrom.status = 'friends';
    friendshipTo.status = 'friends';
    return Promise.all([requester.save(), recipient.save()]);
  }
  throw new BadRequestError({
    msg: 'Users are already friends',
    friendshipStatus: requester.friendList.find((friendship) =>
      friendship.user.equals(recipient._id),
    )?.status,
  });
};

exports.removeFriend = async ({ from, to }) => {
  const fromId = new mongoose.Types.ObjectId(from);
  const toId = new mongoose.Types.ObjectId(to);
  if (fromId.equals(toId)) {
    throw new BadRequestError({
      msg: "Users can't send friend requests to themselves",
    });
  }
  const requester = await User.findById(fromId);
  const recipient = await User.findById(toId);
  if (!requester || !recipient) {
    throw new BadRequestError({
      msg: 'User not found',
    });
  }
  const friendshipFromIndex = requester.friendList.findIndex((friendship) =>
    friendship.user.equals(recipient._id),
  );
  const friendshipToIndex = recipient.friendList.findIndex((friendship) =>
    friendship.user.equals(requester._id),
  );
  if (friendshipFromIndex === -1) {
    throw new BadRequestError({
      msg: "There's no friendship between the users",
      friendshipStatus: requester.friendList.find((friendship) =>
        friendship.user.equals(recipient._id),
      )?.status,
    });
  }
  requester.friendList.splice(friendshipFromIndex, 1);
  recipient.friendList.splice(friendshipToIndex, 1);
  return Promise.all([requester.save(), recipient.save()]);
};
