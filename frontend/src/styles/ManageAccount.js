import styled from "styled-components";
import Card from "./Card";

export const ManageAccountContainer = styled(Card)`
  padding: 32px;
  flex: 0 3 600px;
  h2, h3, h4, h5 {
    font-family: 'Outfit', sans-serif;
  }
  hr {
    border: none;
    border-top: 1px solid var(--color-gray-dark);
    margin: 16px 0;
  }
  h2, h3 {
    font-weight: 700;
    text-align: center;
    font-size: 1.6rem;
  }
`;

export const ManageAccountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  label {
    font-size: 0.8rem;
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
  }
  input[type="text"],
  input[type="password"],
  textarea {
    font-size: 1rem;
    padding: 8px;
    border-radius: 4px;
    border: none;
    font-family: 'Roboto', sans-serif;
    color: black;
    outline: none;
  }
  input::placeholder {
    color: var(--color-gray-dark);
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2px;
`;

export const Buttons = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  justify-content: flex-end;
`;

export const SubmitButton = styled.button`
  background-color: var(--color-orange);
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  width: max-content;
  padding: 8px 16px;
  border-radius: 4px;
`;
