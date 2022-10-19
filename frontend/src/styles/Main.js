import styled from "styled-components";

const Main = styled.main`
  position: relative;
  flex: 1 1 auto;
  padding: 0 8px;
  margin: 16px auto;
  max-width: ${(props) => props.maxWidth ? props.maxWidth : '1064px'};
  width: 100%;
  display: flex;
  gap: 16px;
  ${(props) => props.column
  ? `
    flex-direction: column;
    justify-content: flex-start;
  `
  : `
    flex-direction: row;
    justify-content: center;
  `}
`;

export default Main;
