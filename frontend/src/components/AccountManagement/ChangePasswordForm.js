import { useContext } from 'react';
import { useState } from 'react';
import api from '../../adapters/api';
import { UserContext } from '../../contexts/UserContext';
import Form from '../../styles/Form';
import {
  ButtonsContainer,
  CancelButton,
  FormContainer,
  InputContainer,
  SubmitButton,
} from '../../styles/AccountManagement';
import Input from '../Input';
import Modal from '../Modal';
import { ToastContext } from 'src/contexts/ToastContext';
import { GlobalLoadingContext } from 'src/contexts/GlobalLoadingContext';

function ChangePasswordForm({ setFormVisible }) {
  const { setUser } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const { setGlobalLoading } = useContext(GlobalLoadingContext);
  const { sendNotification } = useContext(ToastContext);

  async function handleSubmit(event) {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrors({
        confirmNewPassword: {
          msg: "Passwords don't match",
        },
      });
      return;
    }
    setErrors(null);
    setGlobalLoading(true);
    try {
      const newUser = (
        await api.put(`/users/me/password`, { password, newPassword })
      ).data.user;
      setUser(newUser);
      setFormVisible(false);
      sendNotification({
        type: 'success',
        text: 'Password successfully updated!',
      });
    } catch (err) {
      const { invalidFields } = err.response.data;
      invalidFields && setErrors(invalidFields);
    }
    setGlobalLoading(false);
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
              autoComplete="current-password"
              autoFocus
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
              autoComplete="new-password"
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
              autoComplete="new-password"
            />
          </InputContainer>
          <ButtonsContainer>
            <CancelButton type="button" onClick={() => setFormVisible(false)}>
              CANCEL
            </CancelButton>
            <SubmitButton>SUBMIT</SubmitButton>
          </ButtonsContainer>
        </Form>
      </FormContainer>
    </Modal>
  );
}

export default ChangePasswordForm;
