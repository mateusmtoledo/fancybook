import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import api from "../adapters/api";
import Card from "../styles/Card";
import Form from "../styles/Form";

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

  async function submitSignUp(event) {
    event.preventDefault();
    try {
      await api.post('/sign-up', {
        firstName,
        lastName,
        email,
        password,
      });
    } catch (err) {
      // TODO implement error handling
      console.log(err);
    }
  }

  return (
    <StyledSignUpForm>
      <Card>
        <Form onSubmit={submitSignUp}>
          <div className="same-line">
            <input
              type="text"
              placeholder="First name"
              aria-label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              aria-label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <hr />
          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            aria-label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            aria-label="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
