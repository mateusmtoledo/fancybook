import styled from "styled-components";
import GITHUB_ICON from "../img/github-icon.png";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-brown-dark);
  padding: 12px;
`;

const GithubLink = styled.a`
  img {
    height: 24px;
  }
  
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
  color: var(--color-white);
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  
`;

function Footer() {
  return (
    <StyledFooter>
      <GithubLink href="https://github.com/mateusmtoledo">
        <img alt="GitHub" src={GITHUB_ICON}/>
        <p>mateusmtoledo</p>
      </GithubLink>
    </StyledFooter>
  );
}

export default Footer;
