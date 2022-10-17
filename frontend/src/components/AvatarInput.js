import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Avatar from "./Avatar";
import AvatarForm from "./AccountManagement/AvatarForm";
import ADD_PHOTO_ICON from "../img/add-photo.svg";
import styled from "styled-components";

const AvatarInputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  height: max-content;
  width: max-content;
`;

const AddPhotoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
  overflow: hidden;
  width: 36px;
  height: 36px;
  background: #000000dd;
  border-radius: 100%;
`;

function AvatarInput({ size }) {
  const [formVisible, setFormVisible] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <AvatarInputContainer>
      <Avatar user={user} size={size} />
      <AddPhotoButton
        aria-label="Avatar"
        type="button"
        onClick={() => setFormVisible(true)}
      >
        <img
          src={ADD_PHOTO_ICON}
          alt="Add"
          width="18px"
          height="18px"
        />
      </AddPhotoButton>
      {
        formVisible &&
        <AvatarForm
          setFormVisible={setFormVisible}
        />
      }
    </AvatarInputContainer>
  );
}

export default AvatarInput;
