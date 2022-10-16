import { useContext } from "react";
import { useState } from "react";
import api from "../adapters/api";
import { UserContext } from "../contexts/UserContext";
import Form from "../styles/Form";
import { Buttons, CancelButton, FormContainer, InputContainer, SubmitButton } from "../styles/ManageAccount";
import Input from "./Input";
import Modal from "./Modal";

function ChangePasswordForm({ setFormVisible }) {
  const { setUser } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrors({
        confirmNewPassword: {
          msg: 'Passwords don\'t match',
        },
      });
      return;
    }
    setErrors(null);
    try {
      const newUser = (await api.put(`/users/me/password`, { password, newPassword })).data.user;
      setUser(newUser);
      setFormVisible(false);
    } catch (err) {
      const { invalidFields } = err.response.data;
      invalidFields && setErrors(invalidFields);
    }
  }

  return (
    <Modal setModalVisible={setFormVisible}>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <label htmlFor="password">PASSWORD</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors?.password?.msg}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="new-password">NEW PASSWORD</label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={errors?.newPassword?.msg}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="confirm-new-password">CONFIRM NEW PASSWORD</label>
            <Input
              id="confirm-new-password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              error={errors?.confirmNewPassword?.msg}
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
