import { useContext } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ToastContext } from "src/contexts/ToastContext";
import { ButtonsContainer, CancelButton, FormContainer, SubmitButton } from "src/styles/AccountManagement";
import Form from "src/styles/Form";
import { ErrorMessage } from "src/styles/PostForm";
import api from "../../adapters/api";
import { UserContext } from "../../contexts/UserContext";
import Avatar from "../Avatar";
import Modal from "../Modal";

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
}

function AvatarForm({ setFormVisible }) {
  const { user, setUser } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const { setLoading } = useOutletContext();
  const { sendNotification } = useContext(ToastContext);
  
  async function handleSubmit(event) {
    event.preventDefault();
    if (error) return;
    setLoading(true);
    try {
      const base64img = await getBase64(file);
      const response = await api.put('/users/me/avatar', {
        avatar: base64img,
      });
      setUser(response.data.user);
      setFormVisible(false);
      sendNotification({ type: 'success',  text: 'Avatar successfully updated!' });
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) setError('Invalid image file');
      } else {
        setError('Server error');
      }
      console.log(err);
    }
    setLoading(false);
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
            onChange={async (e) => {
              setFile(e.target.files[0]);
              setError(null);
            }}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
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

export default AvatarForm;
