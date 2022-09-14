import styled from "styled-components";

const Main = styled.main`
  flex: 1;
  padding: 16px 8px;
  max-width: 1064px;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.column ? 'column' : 'row'};
  justify-content: ${(props) => props.column ? 'flex-start' : 'center'};
  margin: auto;
  gap: 16px;
`;

export default Main;
