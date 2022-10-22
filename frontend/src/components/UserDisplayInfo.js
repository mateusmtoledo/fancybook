import { AuthorName, PostDate, UserDisplayInfoLink } from "src/styles/UserDisplayInfo";
import { getDateString } from "../adapters/dateFormatter";
import Avatar from "./Avatar";

function UserDisplayInfo({ user, avatarSize, postDate, bold }) {
  return (
    <div>
      <UserDisplayInfoLink to={`/user/${user._id}`}>
        <Avatar
          user={user}
          size={avatarSize}
        />
        <div>
          <AuthorName bold={bold}>{user.fullName}</AuthorName>
          {postDate
            && <PostDate className="post-date">{getDateString(postDate)}</PostDate>}
        </div>
      </UserDisplayInfoLink>
    </div>
  );
}

export default UserDisplayInfo;
