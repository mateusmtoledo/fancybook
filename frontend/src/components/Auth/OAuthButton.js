import styled from 'styled-components';

const StyledLink = styled.a`
  flex: 1;
  max-width: 100px;
`;

const OAuthButtonContainer = styled.button`
  padding-right: 8px;
  height: 36px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-weight: 700;
  width: 100%;
  gap: 4px;

  img {
    height: 100%;
    max-width: 36px;
  }
`;

export default function OAuthButton({ name, icon, url, className }) {
  return (
    <StyledLink href={url}>
      <OAuthButtonContainer className={className}>
        <img src={icon} alt={name} />
        <p>{name}</p>
      </OAuthButtonContainer>
    </StyledLink>
  );
}
