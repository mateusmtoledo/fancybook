exports.sendFriendRequest = ({ from, to }) => {
  if (from
    .friendList
    .some((friendship) => friendship.user.equals(to._id))
  ) {
    throw new Error('Users are already friends or there is a pending request');
  }

  from.friendList.push({
    user: to._id,
    status: 'sent',
  });
  to.friendList.push({
    user: from._id,
    status: 'pending',
  });
  return Promise.all([from.save(), to.save()]);
};

exports.acceptFriendRequest = ({ from, to }) => {
  const friendshipFrom = from.friendList.find((friendship) => friendship.user.equals(to._id));
  const friendshipTo = to.friendList.find((friendship) => friendship.user.equals(from._id));
  if (!friendshipFrom || friendshipFrom.status === 'sent') {
    throw new Error('There is no pending request');
  }
  if (friendshipFrom.status === 'pending') {
    friendshipFrom.status = 'friends';
    friendshipTo.status = 'friends';
    return Promise.all([from.save(), to.save()]);
  }
  throw new Error('Users are friends already');
};

exports.removeFriend = ({ from, to }) => {
  const friendshipFromIndex = from.friendList
    .findIndex((friendship) => friendship.user.equals(to._id));
  const friendshipToIndex = to.friendList
    .findIndex((friendship) => friendship.user.equals(from._id));
  if (friendshipFromIndex === -1) {
    throw new Error('There\'s no friendship between the users');
  }
  from.friendList.splice(friendshipFromIndex);
  to.friendList.splice(friendshipToIndex);
  return Promise.all([from.save(), to.save()]);
};
