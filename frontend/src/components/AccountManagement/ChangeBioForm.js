import { useContext } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
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
import { ErrorMessage } from '../../styles/PostForm';
import TextArea from '../../styles/TextArea';
import Modal from '../Modal';
import { ToastContext } from 'src/contexts/ToastContext';
import { GlobalLoadingContext } from 'src/contexts/GlobalLoadingContext';

const BioInput = styled(TextArea)`
  border-radius: 4px;
`;

function ChangeBioForm({ setFormVisible }) {
  const { user, setUser } = useContext(UserContext);
  const [bio, setBio] = useState(user.bio);
  const [errors, setErrors] = useState(null);
  const { setGlobalLoading } = useContext(GlobalLoadingContext);
  const { sendNotification } = useContext(ToastContext);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors(null);
    setGlobalLoading(true);
    try {
      const newUser = (await api.put(`/users/me/bio`, { bio })).data.user;
      setUser(newUser);
      setFormVisible(false);
      sendNotification({ type: 'success', text: 'Bio successfully updated!' });
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
            <label htmlFor="bio">BIO</label>
            <BioInput
              id="bio"
              name="bio"
              rows="10"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={errors?.bio && 'invalid'}
              autoFocus
            />
            {errors?.bio && <ErrorMessage>{errors.bio.msg}</ErrorMessage>}
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

export default ChangeBioForm;
