import { ManageAccountForm, FlexColumn, Buttons, SubmitButton } from "../styles/ManageAccount";
import { useState } from "react";
import TextArea from "../styles/TextArea";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import api from "../adapters/api";
import AvatarInput from "./AvatarInput";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [bio, setBio] = useState(user.bio);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const newUser = (await api.put('users/me/profile', {
        firstName,
        lastName,
        bio,
      })).data.user;
      setUser(newUser);
    } catch (err) {
      // TODO error handling
      console.log(err);
    }
  }

  // FIXME avatar input should not submit both forms
  // TODO split into different forms that can be submitted separately
  return (
    <ManageAccountForm onSubmit={handleSubmit}>
      <h3>Profile</h3>
      <AvatarInput size="128px" />
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
      <FlexColumn>
        <label htmlFor="bio">BIO</label>
        <TextArea
          id="bio"
          name="bio"
          rows="7"
          columns="7"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </FlexColumn>
      <Buttons>
        <SubmitButton>
          SUBMIT
        </SubmitButton>
      </Buttons>
    </ManageAccountForm>
  );
}

export default Profile;
