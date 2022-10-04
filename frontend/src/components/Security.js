import { useState } from "react";
import { Buttons, FlexColumn, ManageAccountForm, SubmitButton } from "../styles/ManageAccount";

function Security() {
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ManageAccountForm>
      <h3>Security</h3>
      <h4>Change Password</h4>
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
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FlexColumn>
      <FlexColumn>
        <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
