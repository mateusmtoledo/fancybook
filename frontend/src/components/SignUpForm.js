import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../adapters/api";
import Card from "../styles/Card";
import Form from "../styles/Form";
import Input from "./Input";

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
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrors({
        confirmPassword: {
          msg: 'Passwords don\'t match',
        },
      });
      return;
    }
    try {
      await api.post('/sign-up', {
        firstName,
        lastName,
        email,
        password,
      });
      navigate('/');
    } catch (err) {
      const { invalidFields } = err.response.data;
      invalidFields && setErrors(invalidFields);
    }
  }

  return (
    <StyledSignUpForm>
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
            type="email"
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
          <input
            type="submit"
            value="Sign up"
          />
          <p>Already registered? <Link to="/">Sign in</Link></p>
        </Form>
      </Card>
    </StyledSignUpForm>
  );
}

export default SignUp;
