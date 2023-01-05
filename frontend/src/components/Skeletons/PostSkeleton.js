import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CommentCounterContainer } from "src/styles/CommentCounter";
import InteractionButton from "src/styles/InteractionButton";
import { LikeCounterStyled } from "src/styles/LikeCounter";
import {
  ButtonsContainer,
  PostContainer,
  PostStatsContainer,
  PostText,
} from "src/styles/Post";
import {
  AuthorName,
  PostDate,
  UserDisplayInfoLink,
} from "src/styles/UserDisplayInfo";

function PostSkeleton() {
  return (
    <PostContainer>
      <div>
        <UserDisplayInfoLink
          as="div"
          style={{
            marginBottom: "16px",
          }}
        >
          <Skeleton circle width={32} height={32} />
          <div>
            <AuthorName>
              <Skeleton width={150} />
            </AuthorName>
            <PostDate>
              <Skeleton width={100} />
            </PostDate>
          </div>
        </UserDisplayInfoLink>
      </div>
      <PostText>
        <Skeleton count={2} />
      </PostText>
      <PostStatsContainer>
        <LikeCounterStyled as="div">
          <Skeleton width={60} />
        </LikeCounterStyled>
        <CommentCounterContainer as="div">
          <Skeleton width={60} />
        </CommentCounterContainer>
      </PostStatsContainer>
      <hr />
      <ButtonsContainer>
        <InteractionButton as="div">
          <Skeleton circle width={24} height={24} />
          <p>
            <Skeleton width={48} />
          </p>
        </InteractionButton>
        <InteractionButton as="div">
          <Skeleton circle width={24} height={24} />
          <p>
            <Skeleton width={48} />
          </p>
        </InteractionButton>
      </ButtonsContainer>
    </PostContainer>
  );
}

export default PostSkeleton;
