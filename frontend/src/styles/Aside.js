import styled from "styled-components";

const Aside = styled.aside`
  position: sticky;
  top: 16px;
  flex: 1 1 256px;
  height: max-content;
  
  @media (max-width: 650px) {
    display: none;
  }
`;

export default Aside;
