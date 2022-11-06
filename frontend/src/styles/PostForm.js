import styled from 'styled-components';
import Card from './Card';

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 4px;
  text-align: left;
`;

export const PostFormContainer = styled(Card)`
  position: relative;
  .post-text {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  .user-input {
    flex: 1;
    position: relative;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  hr {
    border: none;
    border-top: 1px solid var(--color-gray-dark);
  }
`;
