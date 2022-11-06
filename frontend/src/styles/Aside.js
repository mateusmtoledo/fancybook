import styled from 'styled-components';

const Aside = styled.aside`
  flex: 1 1 256px;
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 650px) {
    flex: 1;
  }
`;

export default Aside;
