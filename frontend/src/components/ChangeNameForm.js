import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Form from "../styles/Form";
import { Buttons, CancelButton, FormContainer, InputContainer, SubmitButton } from "../styles/ManageAccount";
import Modal from "./Modal";

function ChangeNameForm({ setFormVisible }) {
  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  return (
    <Modal setModalVisible={setFormVisible}>
      <FormContainer>
        <Form>
          <InputContainer>
            <label htmlFor="firstName">FIRST NAME</label>
            <input
              id="firstName"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="lastName">LAST NAME</label>
            <input
              id="lastName"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
