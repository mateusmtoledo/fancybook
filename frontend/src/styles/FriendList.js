import styled from 'styled-components';
import { Button } from './AccountManagement';
import Card from './Card';

export const FriendListContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.4rem;
    border-bottom: 1px solid var(--color-gray-dark);
    padding-bottom: 8px;
    margin-bottom: 8px;
  }

  @media (max-width: 650px) {
    min-height: 0;
  }
`;

export const Friends = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
  gap: 16px;

  ::-webkit-scrollbar {
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--color-orange);
    border-radius: 20px;
  }

  @media (max-width: 650px) {
    display: flex;
    overflow: auto;
    padding: 8px;
  }
`;

export const NoFriends = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
  gap: 8px;
`;

export const NextPageButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--color-orange);
  grid-column: 1 / -1;

  img {
    display: none;
  }

  @media (max-width: 650px) {
    padding: 0;
    p {
      display: none;
    }
    img {
      display: block;
    }
  }
`;
