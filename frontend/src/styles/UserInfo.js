import styled from 'styled-components';
import Card from './Card';

export const UserInfoContainer = styled(Card)`
  width: 100%;
  height: max-content;
  padding: 0;

  .options {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 16px;
    gap: 8px;
    min-height: 64px;
  }
`;

export const BasicUserInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  background: ${(props) => `url(${props.coverPhoto}),
    url('https://images.pexels.com/photos/706498/pexels-photo-706498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`};
  background-position: center;
  height: 220px;
  padding: 8px 32px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  & > *:first-child {
    position: relative;
    top: 32px;
  }
  h4 {
    font-size: 2rem;
    font-family: 'Outfit', sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  @media (max-width: 650px) {
    padding: 8px 16px;
    img[alt$='avatar'] {
      width: 104px;
      height: 104px;
    }
    h4 {
      font-size: 1.8rem;
    }
  }

  @media (max-width: 450px) {
    padding: 4px 8px;
    img[alt$='avatar'] {
      width: 84px;
      height: 84px;
    }
    h4 {
      font-size: 1.4rem;
    }
    & > *:first-child {
      top: 24px;
    }
  }
`;
