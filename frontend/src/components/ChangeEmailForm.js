import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Form from "../styles/Form";
import { Buttons, CancelButton, FormContainer, InputContainer, SubmitButton } from "../styles/ManageAccount";
import Modal from "./Modal";

function ChangeEmailForm({ setFormVisible }) {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState(user.email);

  return (
    <Modal setModalVisible={setFormVisible}>
      <FormContainer>
        <Form>
          <InputContainer>
            <label htmlFor="email">EMAIL</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default ChangeEmailForm;
