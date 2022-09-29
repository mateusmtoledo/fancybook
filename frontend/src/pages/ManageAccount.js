import styled from "styled-components";
import Main from "../styles/Main";
import Card from "../styles/Card";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Avatar from "../components/Avatar";
import ADD_PHOTO_ICON from "../img/add-photo.svg";
import TextArea from "../styles/TextArea";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ManageAccountContainer = styled(Card)`
  padding: 32px;
  max-width: 550px;
  flex: 1;
  hr {
    border: none;
    border-top: 1px solid var(--color-gray-dark);
    margin: 16px 0;
  }
  h2, h3 {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    text-align: center;
    font-size: 1.6rem;
  }
`;

const ManageAccountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  label {
    font-size: 0.8rem;
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
  }
  input[type="text"],
  input[type="password"] {
    font-size: 1rem;
    padding: 8px;
    border-radius: 4px;
    border: none;
    font-family: 'Roboto', sans-serif;
  }
  input::placeholder {
    color: var(--color-gray-dark);
  }
`;

const TextInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const DisplayInfo = styled.div`
  display: flex;
  gap: 32px;
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

const BioInput = styled(TextArea)`
  border-radius: 4px;
  color: black;
`;

function ManageAccount() {
  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user]);

  return (
    <Main>
      <ManageAccountContainer>
        <ManageAccountForm>
          <Section>
            <h3>Personal Information</h3>
            <DisplayInfo>
              <PictureInput>
                <Avatar user={user} size="128px" />
                <AddPhoto aria-label="Avatar" type="button">
                  <img
                    src={ADD_PHOTO_ICON}
                    alt="Add"
                    width="18px"
                    height="18px"
                  />
                </AddPhoto>
              </PictureInput>
              <NameInputs>
                <TextInputDiv>
                  <label htmlFor="firstName">FIRST NAME</label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    aria-label="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </TextInputDiv>
                <TextInputDiv>
                  <label htmlFor="lastName">LAST NAME</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    aria-label="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </TextInputDiv>
              </NameInputs>
            </DisplayInfo>
            <TextInputDiv>
              <label htmlFor="bio">BIO</label>
              <BioInput
                id="bio"
                name="bio"
                rows="7"
                columns="7"
              />
            </TextInputDiv>
          </Section>
          <hr />
          <Section>
            <h3>Security</h3>
            <TextInputDiv>
              <label htmlFor="password">PASSWORD</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </TextInputDiv>
            <TextInputDiv>
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                aria-label="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </TextInputDiv>
          </Section>
        </ManageAccountForm>
      </ManageAccountContainer>
    </Main>
  );
}

export default ManageAccount;
