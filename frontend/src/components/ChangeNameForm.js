import { useContext } from "react";
import { useState } from "react";
import api from "../adapters/api";
import { UserContext } from "../contexts/UserContext";
import Form from "../styles/Form";
import { Buttons, CancelButton, FormContainer, InputContainer, SubmitButton } from "../styles/ManageAccount";
import Input from "./Input";
import Modal from "./Modal";

function ChangeNameForm({ setFormVisible }) {
  const { user, setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [errors, setErrors] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors(null);
    try {
      const newUser = (await api.put(`/users/me/name`, { firstName, lastName })).data.user;
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
          <Buttons>
            <CancelButton
              type="button"
              onClick={() => setFormVisible(false)}
            >
                CANCEL
            </CancelButton>
            <SubmitButton>SUBMIT</SubmitButton>
          </Buttons>
        </Form>
      </FormContainer>
    </Modal>
  );
}

export default ChangeNameForm;
