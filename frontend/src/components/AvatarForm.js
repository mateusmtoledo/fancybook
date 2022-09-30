import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import api from "../adapters/api";
import { UserContext } from "../contexts/UserContext";
import Card from "../styles/Card";
import Avatar from "./Avatar";
import Modal from "./Modal";

const AvatarFormButton = styled.button`
  background-color: ${(props) => props.submit ? 'var(--color-orange)' : 'var(--color-gray-dark)'};
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  padding: 8px;
  border-radius: 4px;
`;

const AvatarFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  h2 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.5rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

function AvatarForm({ setAvatarFormVisible }) {
  const { user } = useContext(UserContext);
  const [file, setFile] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('avatar', file);
    await api.post('/users/me', formData);
  }

  function handleCancel() {
    setAvatarFormVisible(false);
  }

  return (
    <Modal setModalVisible={() => setAvatarFormVisible(false)}>
      <Card padding="32px">
        <AvatarFormContainer onSubmit={handleSubmit}>
          <h2>Upload your picture</h2>
          <Avatar
            src={file ? URL.createObjectURL(file) : user.avatar}
            alt="Avatar preview"
            size="128px"
          />
          <input
            id="avatar"
            aria-label="Avatar"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Buttons>
            <AvatarFormButton submit>Save</AvatarFormButton>
            <AvatarFormButton onClick={handleCancel} type="button">Cancel</AvatarFormButton>
          </Buttons>
        </AvatarFormContainer>
      </Card>
    </Modal>
  );
}

export default AvatarForm;
