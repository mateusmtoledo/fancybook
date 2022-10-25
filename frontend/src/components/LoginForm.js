import styled from "styled-components";
import Form from "../styles/Form";
import GOOGLE_SIGN_IN from "../img/google-sign-in.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import api from "../adapters/api";
import Input from "./Input";
import GlobalLoading from "./GlobalLoading";
import { ToastContext } from "src/contexts/ToastContext";

const GoogleSignIn = styled.button`
  margin: 0 auto;
  img {
    height: 42px;
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
  min-height: 345px;
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
  }
`;

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(UserContext);
  const { sendNotification } = useContext(ToastContext);
  const navigate = useNavigate();

  async function submitLogin(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/login', {email, password});
      localStorage.setItem('token', response.data.token);
      await login();
      navigate('/');
    } catch(err) {
      const { invalidFields } = err?.response?.data;
      if (invalidFields) {
        setErrors(invalidFields);
        return;
      }
      sendNotification({
        type: 'error',
        text: 'Something went wrong',
      });
    }
    setLoading(false);
  }

  return (
    <LoginContainer>
      {loading && <GlobalLoading />}
      <Form onSubmit={submitLogin}>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors?.email?.msg}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors?.password?.msg}
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
