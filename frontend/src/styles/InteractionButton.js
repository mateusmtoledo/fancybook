import styled from "styled-components";

const InteractionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 8px;
  gap: 4px;
  border-radius: 4px;
  flex: 1;
  max-width: 150px;

  color: var(--color-gray-lighter);
  stroke: var(--color-gray-lighter);

  &[data-active="true"] {
    color: var(--color-orange);
    stroke: var(--color-orange);
  }

  :hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

export default InteractionButton;
