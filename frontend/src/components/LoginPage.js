import styled from "styled-components";
import Form from "./Form";
import GOOGLE_SIGN_IN from "../img/google-sign-in.png";
import { Link } from "react-router-dom";

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

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 12px;

  width: 100%;
  max-width: 345px;
  height: 345px;
  padding: 16px;

  background-color: var(--color-brown-dark);
  box-shadow: var(--shadow-card);
  border-radius: 16px;

  .small-text {
    font-size: 0.75rem;
  }

  a {
    color: var(--color-orange);
    font-weight: 700;
    text-decoration: none;
  }
`;

const GoogleSignIn = styled.button`
  margin: 0 auto;
  height: 42px;

  background: none;
  border: none;

  img {
    height: 100%;
    cursor: pointer;
  }
`;

function SignUpPage() {
  return (
    <>
      <Hero>
        <h1>fancybook</h1>
        <p>Fancybook is a social network that helps you stay connected with people who are a part of your life.</p>
      </Hero>
      <LoginForm>
        <Form>
          <input type="text" placeholder="Email" aria-label="Email" />
          <input type="password" placeholder="Password" aria-label="Password" />
          <input type="submit" value="Sign in" />
        </Form>
        <p className="small-text">OR</p>
        <GoogleSignIn>
          <img src={GOOGLE_SIGN_IN} alt="Sign in with Google" />
        </GoogleSignIn>
        <p>Not registered? <Link to="/sign-up">Create account</Link></p>
      </LoginForm>
    </>
  );
}

export default SignUpPage;
