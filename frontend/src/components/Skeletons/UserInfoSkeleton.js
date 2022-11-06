import { BasicUserInfo, UserInfoContainer } from 'src/styles/UserInfo';
import Skeleton from 'react-loading-skeleton';

function UserInfoSkeleton() {
  return (
    <UserInfoContainer coverPhoto="/">
      <BasicUserInfo style={{ background: 'none' }}>
        <Skeleton circle width={128} height={128} />
        <h4>
          <Skeleton width={300} />
        </h4>
      </BasicUserInfo>
      <div className="options">
        <Skeleton />
      </div>
    </UserInfoContainer>
  );
}

export default UserInfoSkeleton;
