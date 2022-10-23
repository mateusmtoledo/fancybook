import styled from "styled-components";
import Card from "./Card";

export const FriendListContainer = styled(Card)`
  min-height: 420px;

  h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.4rem;
    margin-bottom: 8px;
  }
`;

export const Friends = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
  gap: 16px;
`;

export const NoFriends = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
  font-weight: 700;
  gap: 8px;
  opacity: 0.6;
`;
