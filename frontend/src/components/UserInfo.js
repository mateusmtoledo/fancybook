import Avatar from "./Avatar";
import FriendshipButtons from "./FriendshipButtons";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import AvatarInput from "./AvatarInput";
import { BasicUserInfo, UserInfoContainer } from "src/styles/UserInfo";
import UserInfoSkeleton from "./Skeletons/UserInfoSkeleton";

function UserInfo({ user, userLoading, friendshipStatus }) {
  const { user: currentUser } = useContext(UserContext);

  if (userLoading) return (
    <UserInfoSkeleton />
  )

  return (
    <UserInfoContainer coverPhoto={user.coverPhoto}>
      <BasicUserInfo>
        {
          user._id === currentUser._id
            ? <AvatarInput
                size="128px"
              />
            : <Avatar
                size="128px"
                user={user}
              />
        }
        <h4>{user.fullName}</h4>
      </BasicUserInfo>
      <div className="options">
        <FriendshipButtons
          friendshipStatus={friendshipStatus}
          targetUserId={user._id}
        />
      </div>
    </UserInfoContainer>
  );
}

export default UserInfo;
