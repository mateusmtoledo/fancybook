import Main from '../styles/Main';
import SignUpForm from '../components/Auth/SignUpForm';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const HeroText = styled.p`
  color: var(--color-white);
  font-weight: 300;
  margin-bottom: 8px;
  font-size: 1.4rem;
  align-self: flex-start;
`;

const FancybookLogo = styled.h1`
  font-family: 'Cabin', sans-serif;
  font-weight: 700;
  font-size: 3rem;
  color: var(--color-orange);
  align-self: flex-start;
`;

function SignUp() {
  return (
    <Main>
      <SignUpContainer>
        <Link to="/">
          <FancybookLogo>fancybook</FancybookLogo>
        </Link>
        <HeroText>Sign up to fancybook</HeroText>
        <SignUpForm />
      </SignUpContainer>
    </Main>
  );
}

export default SignUp;
