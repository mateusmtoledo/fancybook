import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import Form from "../styles/Form";
import { Buttons, CancelButton, FormContainer, InputContainer, SubmitButton } from "../styles/ManageAccount";
import TextArea from "../styles/TextArea";
import Modal from "./Modal";

const BioInput = styled(TextArea)`
  border-radius: 4px;
`;

function ChangeBioForm({ setFormVisible }) {
  const { user } = useContext(UserContext);
  const [bio, setBio] = useState(user.bio);

  return (
    <Modal setModalVisible={setFormVisible}>
      <FormContainer>
        <Form>
          <InputContainer>
            <label htmlFor="bio">BIO</label>
            <BioInput
              id="bio"
              name="bio"
              rows="10"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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

export default ChangeBioForm;
