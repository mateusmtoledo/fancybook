import { useState } from "react";
import Form from "../styles/Form";
import { Buttons, CancelButton, FormContainer, InputContainer, SubmitButton } from "../styles/ManageAccount";
import Modal from "./Modal";

function ChangePasswordForm({ setFormVisible }) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
    <Modal setModalVisible={setFormVisible}>
      <FormContainer>
        <Form>
          <InputContainer>
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="new-password">NEW PASSWORD</label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="confirm-new-password">CONFIRM NEW PASSWORD</label>
            <input
              id="confirm-new-password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </InputContainer>
          <Buttons>
            <CancelButton
              type="button"
              onClick={() => setFormVisible(false)}
            >
                CANCEL
            </CancelButton>
            <SubmitButton>
              SUBMIT
            </SubmitButton>
          </Buttons>
        </Form>
      </FormContainer>
    </Modal>
  );
}

export default ChangePasswordForm;
