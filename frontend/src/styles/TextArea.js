import styled from "styled-components";

const TextArea = styled.textarea`
  font-family: 'Roboto', sans-serif;
  padding: 8px;
  font-size: 1rem;
  border-radius: 16px;
  background-color: var(--color-white);
  border: none;
  width: 100%;
  color: var(--color-gray-dark);
  resize: none;
  &:focus {
    outline: none;
  }
  &.invalid {
    outline: 2px solid red;
  }
  &::placeholder {
    color: var(--color-gray);
  }
`;

export default TextArea;
