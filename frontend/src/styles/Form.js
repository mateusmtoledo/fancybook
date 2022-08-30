import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .same-line {
    display: flex;
    gap: 16px;
  }

  fieldset {
    border: 1px solid var(--color-gray-dark);
    padding: 12px 8px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="submit"],
  label {
    font-size: 1rem;
    padding: 12px 8px;
    border-radius: 4px;
    border: none;
    width: 100%;
  }

  input::placeholder {
    color: var(--color-gray-dark);
  }

  input[type="submit"] {
    background-color: var(--color-orange);
    color: var(--color-white);
    font-weight: 700;
    cursor: pointer;
  }
`;

export default Form;
