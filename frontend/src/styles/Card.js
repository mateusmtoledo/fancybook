import styled from "styled-components";

const Card = styled.div`
  background-color: var(--color-brown-dark);
  border-radius: 8px;
  padding: ${(props) => props.padding || '16px'};
  box-shadow: var(--shadow-card);
`;

export default Card;
