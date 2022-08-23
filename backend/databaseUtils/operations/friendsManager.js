const User = require('../models/User');

exports.addFriend = (requesterId, recipientId) => {
  const queries = [
    User.findById(requesterId),
    User.findById(recipientId),
  ];

  return Promise.all(queries).then(([requester, recipient]) => {
    const recipientFriendship = recipient
      .friendList
      .find((item) => item.user.equals(requester._id));
    if (recipientFriendship) {
      const requesterFriendship = requester
        .friendList
        .find((item) => item.user.equals(recipient._id));
      if (recipientFriendship.status === 'pending') {
        throw new Error('Request already sent');
      } else if (recipientFriendship.status === 'friends') {
        throw new Error('Users are already friends');
      } else if (recipientFriendship.status === 'sent') {
        recipientFriendship.status = 'friends';
        requesterFriendship.status = 'friends';
      }
    } else {
      recipient.friendList.push({
        user: requester._id,
        status: 'pending',
      });
      requester.friendList.push({
        user: recipient._id,
        status: 'sent',
      });
    }
    return Promise.all([recipient.save(), requester.save()]);
  });
};
