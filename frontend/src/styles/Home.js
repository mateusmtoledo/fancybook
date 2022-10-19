import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  display: flex;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;
