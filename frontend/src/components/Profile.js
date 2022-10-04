import styled from "styled-components";
import { ManageAccountForm, FlexColumn, Buttons, SubmitButton } from "../styles/ManageAccount";
import Avatar from "./Avatar";
import ADD_PHOTO_ICON from "../img/add-photo.svg";
import { useState } from "react";
import TextArea from "../styles/TextArea";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import AvatarForm from "./AvatarForm";

const DisplayInfo = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const NameInputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 8px;
  width: 100%;
`;

const PictureInput = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  height: max-content;
  width: max-content;
  align-self: center;
`;

const AddPhoto = styled.button`
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

function Profile() {
  const [avatarFormVisible, setAvatarFormVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { user } = useContext(UserContext);

  return (
    <>
        {
          avatarFormVisible &&
          <AvatarForm
            setAvatarFormVisible={setAvatarFormVisible}
          />
        }
        <ManageAccountForm>
          <h3>Profile</h3>
          <DisplayInfo>
            <PictureInput>
              <Avatar user={user} size="128px" />
              <AddPhoto
                aria-label="Avatar"
                type="button"
                onClick={() => setAvatarFormVisible(true)}
              >
                <img
                  src={ADD_PHOTO_ICON}
                  alt="Add"
                  width="18px"
                  height="18px"
                />
              </AddPhoto>
            </PictureInput>
            <NameInputs>
              <FlexColumn>
                <label htmlFor="firstName">FIRST NAME</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  aria-label="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FlexColumn>
              <FlexColumn>
                <label htmlFor="lastName">LAST NAME</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  aria-label="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FlexColumn>
            </NameInputs>
          </DisplayInfo>
          <FlexColumn>
            <label htmlFor="bio">BIO</label>
            <TextArea
              id="bio"
              name="bio"
              rows="7"
              columns="7"
            />
          </FlexColumn>
          <Buttons>
            <SubmitButton>
              SUBMIT
            </SubmitButton>
          </Buttons>
        </ManageAccountForm>
      </>
  );
}

export default Profile;
