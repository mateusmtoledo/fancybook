import styled from 'styled-components';
import Form from '../../styles/Form';
import GOOGLE_SIGN_IN from '../../img/google-sign-in.png';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Input from '../Input';
import { ToastContext } from '../../contexts/ToastContext';
import { GlobalLoadingContext } from '../../contexts/GlobalLoadingContext';

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
  const { setGlobalLoading } = useContext(GlobalLoadingContext);
  const { login, getUser } = useContext(UserContext);
  const { sendNotification } = useContext(ToastContext);
  const navigate = useNavigate();

  async function submitLogin(event) {
    event.preventDefault();
    setGlobalLoading(true);
    try {
      await login({ email, password });
      await getUser();
      navigate('/');
      setGlobalLoading(false);
    } catch (err) {
      const { invalidFields } = err?.response?.data;
      setGlobalLoading(false);
      if (invalidFields) {
        setErrors(invalidFields);
        return;
      }
      sendNotification({
        type: 'error',
        text: 'Something went wrong',
      });
    }
  }

  return (
    <LoginContainer>
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
        <input type="submit" value="Sign in" />
      </Form>
      <p className="small-text">OR</p>
      <GoogleSignIn>
        <a
          href={`${
            process.env.REACT_APP_API_URL || 'http://localhost:3001'
          }/login/google`}
        >
          <img src={GOOGLE_SIGN_IN} alt="Sign in with Google" />
        </a>
      </GoogleSignIn>
      <p>
        Not registered? <Link to="/sign-up">Create account</Link>
      </p>
    </LoginContainer>
  );
}

export default LoginForm;
