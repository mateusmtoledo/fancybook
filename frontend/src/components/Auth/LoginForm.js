import styled from 'styled-components';
import Form from '../../styles/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Input from '../Input';
import { ToastContext } from '../../contexts/ToastContext';
import { GlobalLoadingContext } from '../../contexts/GlobalLoadingContext';
import api from 'src/adapters/api';
import OAuthButton from './OAuthButton';
import GOOGLE_ICON from '../../img/google.svg';

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

const OAuthButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: max-content;
  justify-content: center;
`;

const GoogleButton = styled(OAuthButton)`
  background-color: #258ded;
  color: white;
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
      const invalidFields = err?.response?.data?.invalidFields;
      if (invalidFields) {
        setErrors(invalidFields);
      } else {
        sendNotification({
          type: 'error',
          text: 'Something went wrong',
        });
      }
      setGlobalLoading(false);
    }
  }

  const googleAuthUrl = api.defaults.baseURL + '/login/google';

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
          autoComplete="email"
          autoFocus
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors?.password?.msg}
          autoComplete="current-password"
        />
        <input type="submit" value="Sign in" />
      </Form>
      <p className="small-text">OR</p>
      <OAuthButtonsContainer>
        <GoogleButton name="Google" icon={GOOGLE_ICON} url={googleAuthUrl} />
      </OAuthButtonsContainer>
      <p>
        Not registered? <Link to="/sign-up">Create account</Link>
      </p>
    </LoginContainer>
  );
}

export default LoginForm;
