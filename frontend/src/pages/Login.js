import SampleUserButton from 'src/components/Auth/SampleUserButton';
import styled from 'styled-components';
import LoginForm from '../components/Auth/LoginForm';
import Main from '../styles/Main';

const Hero = styled.div`
  font-size: 1.5rem;
  max-width: 435px;

  h1 {
    font-family: 'Cabin', sans-serif;
    font-weight: 700;
    font-size: 3rem;
    margin-bottom: 12px;
    color: var(--color-orange);
  }
`;

const LoginStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  column-gap: 105px;
  row-gap: 16px;

  @media (max-width: 950px) {
    flex-direction: column;
    max-width: 345px;
  }
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

function Login() {
  return (
    <Main>
      <LoginContainer>
        <LoginStyled>
          <Hero>
            <h1>fancybook</h1>
            <p>
              Fancybook is a social network that helps you stay connected with
              people who are a part of your life.
            </p>
          </Hero>
          <LoginForm />
        </LoginStyled>
        <SampleUserButton />
      </LoginContainer>
    </Main>
  );
}

export default Login;
