import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../adapters/api";
import { UserContext } from "../contexts/UserContext";
import { Buttons, FlexColumn, ManageAccountForm, SubmitButton } from "../styles/ManageAccount";

function Security() {
  const { setUser } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      // TODO error handling
      console.log('Passwords do not match');
      return;
    }
    try {
      const newUser = (await api.put('users/me/password', {
        password,
        newPassword,
      })).data.user;
      setUser(newUser);
      navigate(`/user/${newUser._id}`);
    } catch (err) {
      // TODO error handling
      console.log(err);
    }
  }

  return (
    <ManageAccountForm onSubmit={handleSubmit}>
      <h3>Security</h3>
      <h4>Change Password</h4>
      <FlexColumn>
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FlexColumn>
      <FlexColumn>
        <label htmlFor="new-password">NEW PASSWORD</label>
        <input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </FlexColumn>
      <FlexColumn>
        <label htmlFor="confirm-new-password">CONFIRM NEW PASSWORD</label>
        <input
          id="confirm-new-password"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </FlexColumn>
      <Buttons>
        <SubmitButton>
          SUBMIT
        </SubmitButton>
      </Buttons>
    </ManageAccountForm>
  );
}

export default Security;
