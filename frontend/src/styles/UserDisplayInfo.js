import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AuthorName = styled.p`
  font-size: 1rem;
  font-weight: 700;
  font-weight: ${(props) => (props.bold ? '700' : '300')};
`;

export const PostDate = styled.p`
  font-size: 0.75rem;
  color: var(--color-gray-light);
`;

export const UserDisplayInfoLink = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  max-width: max-content;
  p {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
`;
