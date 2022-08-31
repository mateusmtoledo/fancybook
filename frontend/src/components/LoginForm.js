import styled from "styled-components";
import Form from "../styles/Form";
import GOOGLE_SIGN_IN from "../img/google-sign-in.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import api from "../adapters/api";

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

const LoginContainer = styled.div`
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

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  async function submitLogin(event) {
    event.preventDefault();
    try {
      const response = await api.post('/login', {email, password});
      localStorage.setItem('token', response.data.token);
      await login();
      navigate('/');
    } catch(err) {
      // TODO implement error handling
      console.log(err);
    }
  }

  return (
    <LoginContainer>
      <Form onSubmit={submitLogin}>
        <input
          type="text"
          placeholder="Email"
          aria-label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          aria-label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Sign in"
        />
      </Form>
      <p className="small-text">OR</p>
      <GoogleSignIn>
        <a href={`${process.env.REACT_APP_API_URL}/login/google`}>
          <img src={GOOGLE_SIGN_IN} alt="Sign in with Google" />
        </a>
      </GoogleSignIn>
      <p>Not registered? <Link to="/sign-up">Create account</Link></p>
    </LoginContainer>
  );
}

export default LoginForm;
