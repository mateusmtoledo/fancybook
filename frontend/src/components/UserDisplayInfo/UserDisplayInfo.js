import {
  AuthorName,
  PostDate,
  UserDisplayInfoContainer,
  UserDisplayInfoLink,
} from "src/styles/UserDisplayInfo";
import { getDateString } from "../../utils/dateFormatter";
import Avatar from "./Avatar";

function UserDisplayInfo({ user, avatarSize, postDate, bold, marginBottom }) {
  return (
    <UserDisplayInfoContainer marginBottom={marginBottom}>
      <UserDisplayInfoLink to={`/user/${user._id}`}>
        <Avatar user={user} size={avatarSize} />
        <div>
          <AuthorName bold={bold}>{user.fullName}</AuthorName>
          {postDate && (
            <PostDate className="post-date">{getDateString(postDate)}</PostDate>
          )}
        </div>
      </UserDisplayInfoLink>
    </UserDisplayInfoContainer>
  );
}

export default UserDisplayInfo;
