import { useContext } from "react";
import { useState } from "react";
import api from "../../adapters/api";
import { UserContext } from "../../contexts/UserContext";
import Form from "../../styles/Form";
import { ButtonsContainer, CancelButton, FormContainer, InputContainer, SubmitButton } from "../../styles/AccountManagement";
import Input from "../Input";
import Modal from "../Modal";
import { ToastContext } from "src/contexts/ToastContext";
import { useOutletContext } from "react-router-dom";

function ChangeNameForm({ setFormVisible }) {
  const { user, setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [errors, setErrors] = useState(null);
  const { setLoading } = useOutletContext();
  const { sendNotification } = useContext(ToastContext);
  
  async function handleSubmit(event) {
    event.preventDefault();
    setErrors(null);
    setLoading(true);
    try {
      const newUser = (await api.put(`/users/me/name`, { firstName, lastName })).data.user;
      setUser(newUser);
      setFormVisible(false);
      sendNotification({ type: 'success',  text: 'Name successfully updated!' });
    } catch (err) {
      const { invalidFields } = err.response.data;
      invalidFields && setErrors(invalidFields);
    }
    setLoading(false);
  }

  return (
    <Modal setModalVisible={setFormVisible}>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <label htmlFor="firstName">FIRST NAME</label>
            <Input
              id="firstName"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors?.firstName?.msg}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="lastName">LAST NAME</label>
            <Input
              id="lastName"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors?.lastName?.msg}
            />
          </InputContainer>
          <ButtonsContainer>
            <CancelButton
              type="button"
              onClick={() => setFormVisible(false)}
            >
                CANCEL
            </CancelButton>
            <SubmitButton>SUBMIT</SubmitButton>
          </ButtonsContainer>
        </Form>
      </FormContainer>
    </Modal>
  );
}

export default ChangeNameForm;
