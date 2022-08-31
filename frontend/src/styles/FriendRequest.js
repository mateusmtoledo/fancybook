import styled from "styled-components";

const FriendRequest = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .requester {
    display: flex;
    gap: 8px;
    align-items: center;
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      line-clamp: 1;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }

  .buttons {
    display: flex;
    gap: 4px;
    align-items: center;
    
    button {
      background: none;
      border: none;
      cursor: pointer;
    }
  }
`;

export default FriendRequest;
