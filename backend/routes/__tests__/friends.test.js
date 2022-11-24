const request = require('supertest');
const app = require('../../api/index');
const { fakeUsers } = require('../../database/seeding/fakeUsersAndFriends');
const User = require('../../models/User');

beforeEach(async () => {
  await User.insertMany(fakeUsers);
});

describe('friends route', () => {
  describe('GET method', () => {
    it('requires authentication', async () => {
      await request(app)
        .get(`/users/${fakeUsers[0]._id.str}/friends`)
        .expect(401);
    });

    it("does not send user's requests to other users", async () => {
      await request(app)
        .get(`/users/${fakeUsers[2]._id}/friends`)
        .auth(fakeUsers[0].authToken, { type: 'bearer' })
        .expect((response) => {
          expect(response.body.friends.length).toBe(2);
          expect(response.body).not.toHaveProperty('pending');
          expect(response.body).not.toHaveProperty('sent');
        });
    });

    it("sends user's requests on /me route", async () => {
      await request(app)
        .get('/users/me/friend-requests')
        .auth(fakeUsers[0].authToken, { type: 'bearer' })
        .expect((response) => {
          expect(response.body.friendRequests.length).toBe(1);
        });
    });
  });

  describe('POST method', () => {
    it('sends friend request', async () => {
      const requesterUser = fakeUsers[0];
      let recipientUser = fakeUsers[4];
      await request(app)
        .post(`/users/${recipientUser._id}/friends`)
        .auth(requesterUser.authToken, { type: 'bearer' })
        .expect(200);
      recipientUser = await User.findById(recipientUser);
      const usersFriendship = recipientUser.friendList.find((friendship) =>
        friendship.user.equals(requesterUser._id),
      );
      expect(usersFriendship.status).toBe('pending');
    });
  });

  describe('PUT method', () => {
    it('accepts existing friend request', async () => {
      await request(app)
        .put(`/users/${fakeUsers[1]._id}/friends`)
        .auth(fakeUsers[0].authToken, { type: 'bearer' })
        .expect(200);
      const user = await User.findById(fakeUsers[0]._id);
      expect(
        user.friendList.find((friendship) =>
          friendship.user.equals(fakeUsers[1]._id),
        ).status,
      ).toBe('friends');
    });
  });

  describe('DELETE method', () => {
    it('removes existing friendship between users', async () => {
      await request(app)
        .delete(`/users/${fakeUsers[1]._id}/friends`)
        .auth(fakeUsers[0].authToken, { type: 'bearer' })
        .expect(200);
      const user = await User.findById(fakeUsers[0]._id);
      expect(user.friendList.length).toBe(3);
      expect(
        user.friendList.some((friendship) =>
          friendship.user.equals(fakeUsers[1]._id),
        ),
      ).toBe(false);
    });
  });
});
