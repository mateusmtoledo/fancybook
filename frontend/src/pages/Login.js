import styled from "styled-components";
import LoginForm from "../components/LoginForm";


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

function Login() {
  return (
    <>
      <Hero>
        <h1>fancybook</h1>
        <p>Fancybook is a social network that helps you stay connected with people who are a part of your life.</p>
      </Hero>
      <LoginForm />
    </>
  );
}

export default Login;
