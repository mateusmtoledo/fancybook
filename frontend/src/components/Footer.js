import styled from "styled-components";
import GITHUB_ICON from "../img/github-icon.png";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2C2727;
  padding: 12px;
`;

const GithubLink = styled.a`
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
  color: white;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  
  img {
    height: 24px;
  }
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
