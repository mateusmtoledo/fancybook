import styled from "styled-components";
import Card from "./Card";

export const ManageAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
  min-width: 0;
  h2, h3, h4, h5 {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
  }
  h2 {
    font-size: 1.6rem;
    text-align: center;
  }
  h3 {
    font-size: 1.2rem;
  }
`;

export const ManageAccountSection = styled(Card.withComponent('section'))`
  --padding-x: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
`;

export const Buttons = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  justify-content: flex-end;
`;

export const Button = styled.button`
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  width: max-content;
  padding: 8px 16px;
  border-radius: 4px;
`;

export const SubmitButton = styled(Button)`
  background-color: var(--color-orange);
`;

export const CancelButton = styled(Button)`
  background-color: var(--color-gray-dark);
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FormContainer = styled(Card)`
  width: 400px;
  max-width: 98vw;
`;

export const InfoList = styled.ul`
  margin: 0 calc(-1 * var(--padding-x)) calc(-1 * var(--padding-x));
  li > button {
    border-bottom: 1px solid var(--color-gray-dark);
  }
  li:last-child > button {
    border-bottom: none;
  }
`;
