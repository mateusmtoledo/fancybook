import { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContext } from 'src/contexts/ToastContext';
import styled from 'styled-components';
import api from '../../adapters/api';
import Card from '../../styles/Card';
import Form from '../../styles/Form';
import GlobalLoading from '../GlobalLoading';
import Input from '../Input';

const StyledSignUpForm = styled.div`
  max-width: 435px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  hr {
    border: none;
    border-top: 1px solid var(--color-gray-dark);
  }
  a {
    color: var(--color-orange);
    font-weight: 700;
  }
`;

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { sendNotification } = useContext(ToastContext);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrors({
        confirmPassword: {
          msg: "Passwords don't match",
        },
      });
      return;
    }
    setLoading(true);
    try {
      await api.post('/sign-up', {
        firstName,
        lastName,
        email,
        password,
      });
      navigate('/');
      sendNotification({
        type: 'success',
        text: 'User successfully registered!',
      });
    } catch (err) {
      const { invalidFields } = err.response.data;
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
    <StyledSignUpForm>
      {loading && <GlobalLoading />}
      <Card>
        <Form onSubmit={handleSubmit}>
          <div className="same-line">
            <Input
              type="text"
              name="first-name"
              placeholder="First name"
              aria-label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors?.firstName?.msg}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last name"
              aria-label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors?.lastName?.msg}
            />
          </div>
          <hr />
          <Input
            type="text"
            placeholder="Email"
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors?.email?.msg}
          />
          <Input
            type="password"
            placeholder="Password"
            aria-label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors?.password?.msg}
          />
          <Input
            type="password"
            placeholder="Confirm password"
            aria-label="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors?.confirmPassword?.msg}
          />
          <input type="submit" value="Sign up" />
          <p>
            Already registered? <Link to="/">Sign in</Link>
          </p>
        </Form>
      </Card>
    </StyledSignUpForm>
  );
}

export default SignUp;
