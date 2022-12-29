import styled from 'styled-components';

const StyledLink = styled.a`
  width: 100%;
`;

const OAuthButtonContainer = styled.button`
  align-self: center;
  height: 42px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-weight: 700;
  width: 100%;

  p {
    padding: 4px 8px;
  }
`;

export default function OAuthButton({ name, icon, url, className }) {
  return (
    <StyledLink href={url}>
      <OAuthButtonContainer className={className}>
        <img src={icon} alt={name} height="100%" />
        <p>{`Sign in with ${name}`}</p>
      </OAuthButtonContainer>
    </StyledLink>
  );
}
