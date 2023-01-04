import styled from "styled-components";
import Card from "./Card";

export const PostContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  word-break: break-word;
  width: 100%;
  padding-bottom: 4px;

  hr {
    border: none;
    border-top: 1px solid var(--color-gray-dark);
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  @media (max-width: 400px) {
    gap: 0;
    justify-content: space-between;
  }
`;

export const PostStatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
