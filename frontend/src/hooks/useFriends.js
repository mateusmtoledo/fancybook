import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import api from 'src/adapters/api';
import getUniqueEntriesById from 'src/utils/getUniqueEntriesById';

function useFriends(userId) {
  const [friends, setFriends] = useState([]);
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [friendshipStatus, setFriendshipStatus] = useState('loading');
  const [friendCount, setFriendCount] = useState(0);
  const [hasNextFriendsPage, setHasNextFriendsPage] = useState(false);
  const [friendsPageNumber, setFriendsPageNumber] = useState(1);

  const uri = `/users/${userId}/friends`;

  const loadNextFriendsPage = useCallback(() => {
    setFriendsPageNumber((previous) => previous + 1);
  }, []);

  useEffect(() => {
    setFriends([]);
    setFriendsPageNumber(1);
    setFriendshipStatus('loading');
    setFriendCount(0);
    setHasNextFriendsPage(false);
  }, [userId]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setFriendsLoading(true);
    api
      .get(uri, { params: { page: friendsPageNumber }, signal })
      .then((response) => {
        const { data } = response;
        setFriendsLoading(false);
        if (friendsPageNumber === 1) setFriends(data.friends);
        else
          setFriends((previousFriends) =>
            getUniqueEntriesById([...previousFriends, ...data.friends]),
          );
        // setFriends(data.friends);
        setFriendshipStatus(data.friendshipStatus);
        setFriendCount(data.friendCount);
        setHasNextFriendsPage(data.hasNextFriendsPage);
      })
      .catch((err) => {
        if (signal.aborted) return;
      });
    return () => controller.abort();
  }, [friendsPageNumber, uri]);

  return {
    friends,
    setFriends,
    friendsLoading,
    hasNextFriendsPage,
    loadNextFriendsPage,
    friendCount,
    setFriendCount,
    friendshipStatus,
    setFriendshipStatus,
  };
}

export default useFriends;
