import { InfoList, AccountManagementSection } from "../../styles/AccountManagement";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import EditableInfo from "./EditableInfo";
import ChangeNameForm from "./ChangeNameForm";
import ChangeBioForm from "./ChangeBioForm";
import ChangeEmailForm from "./ChangeEmailForm";
import AvatarForm from "./ChangeAvatarForm";

function PersonalInfo() {
  const { user } = useContext(UserContext);

  return (
    <>
      <AccountManagementSection>
        <h3>Basic Info</h3>
        <InfoList>
          <li>
            <EditableInfo fieldName="Photo" avatar Form={AvatarForm} />
          </li>
          <li>
            <EditableInfo fieldName="Name" fieldValue={user.fullName} Form={ChangeNameForm} />
          </li>
          <li>
            <EditableInfo fieldName="Bio" fieldValue={user.bio} Form={ChangeBioForm} />
          </li>
        </InfoList>
      </AccountManagementSection>
      <AccountManagementSection>
        <h3>Contact Info</h3>
        <InfoList>
          <li>
            <EditableInfo fieldName="Email" fieldValue={user.email} Form={ChangeEmailForm} />
          </li>
        </InfoList>
      </AccountManagementSection>
    </>
  );
}

export default PersonalInfo;
