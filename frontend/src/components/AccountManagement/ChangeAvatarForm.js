import { useContext } from "react";
import { useState } from "react";
import { ButtonsContainer, CancelButton, FormContainer, SubmitButton } from "src/styles/AccountManagement";
import Form from "src/styles/Form";
import { ErrorMessage } from "src/styles/PostForm";
import api from "../../adapters/api";
import { UserContext } from "../../contexts/UserContext";
import Avatar from "../Avatar";
import Modal from "../Modal";

function AvatarForm({ setFormVisible }) {
  const { user, setUser } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (error) return;
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const response = await api.put('/users/me/avatar', formData);
      setUser(response.data.user);
      setFormVisible(false);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) setError('Invalid image file');
      } else {
        setError('Server error');
      }
      console.log(err);
    }
  }

  return (
    <Modal setModalVisible={() => setFormVisible(false)}>
      <FormContainer>
        <Form center onSubmit={handleSubmit}>
          <Avatar
            src={file ? URL.createObjectURL(file) : user.avatar}
            onError={(event) => {
              setError('Invalid image file');
              if(event.target.src !== user.avatar) {
                event.target.src = user.avatar;
              }
            }}
            alt="Avatar preview"
            size="128px"
          />
          <input
            id="avatar"
            aria-label="Avatar"
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setError(null);
            }}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ButtonsContainer>
            <SubmitButton>SUBMIT</SubmitButton>
            <CancelButton
              type="button"
              onClick={() => setFormVisible(false)}
            >
                CANCEL
            </CancelButton>
          </ButtonsContainer>
        </Form>
      </FormContainer>
    </Modal>
  );
}

export default AvatarForm;
