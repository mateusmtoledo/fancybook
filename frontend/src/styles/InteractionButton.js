import styled from "styled-components";

const InteractionButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 1rem;
  gap: 8px;
  color: ${(props) => props.isActive ? 'var(--color-orange)' : 'var(--color-white)'};
  stroke: ${(props) => props.isActive ? 'var(--color-orange)' : 'var(--color-white)'};
`;

export default InteractionButton;
