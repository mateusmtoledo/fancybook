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

function ChangeEmailForm({ setFormVisible }) {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState(user.email);
  const [errors, setErrors] = useState(null);
  const { setGlobalLoading } = useContext(GlobalLoadingContext);
  const { sendNotification } = useContext(ToastContext);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors(null);
    setGlobalLoading(true);
    try {
      const newUser = (await api.put(`/users/me/email`, { email })).data.user;
      setUser(newUser);
      setFormVisible(false);
      sendNotification({
        type: 'success',
        text: 'Email successfully updated!',
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
            <label htmlFor="email">EMAIL</label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors?.email?.msg}
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

export default ChangeEmailForm;
