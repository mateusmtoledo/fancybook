import { useState } from "react";
import styled from "styled-components";
import api from "../adapters/api";
import Card from "../styles/Card";
import Form from "../styles/Form";

const StyledSignUpForm = styled.div`
  max-width: 435px;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  h2 {
    color: var(--color-white);
    margin-bottom: 8px;
    font-family: 'Outfit', sans-serif;
  }
  hr {
    margin-bottom: 16px;
    border: none;
    border-top: 1px solid var(--color-gray-dark);
  }
`;

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function submitSignUp(event) {
    event.preventDefault();
    try {
      await api.post('/sign-up', {
        firstName,
        lastName,
        gender,
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
        <h2>Sign up</h2>
        <hr />
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
          <fieldset onChange={(e) => setGender(e.target.value)}>
            <legend>Gender</legend>
            <input
              type="radio"
              id="male"
              value="Male"
              name="gender"
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              value="Female"
              name="gender"
            />
            <label htmlFor="female">Female</label>
          </fieldset>
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
        </Form>
      </Card>
    </StyledSignUpForm>
  );
}

export default SignUp;
