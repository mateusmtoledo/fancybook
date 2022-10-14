import { InfoList, ManageAccountSection } from "../styles/ManageAccount";
import EditableInfo from "./EditableInfo";
import ChangePasswordForm from "./ChangePasswordForm";

function Security() {
  return (
    <>
      <h2>Security</h2>
      <ManageAccountSection>
        <h3>Password</h3>
        <InfoList>
          <EditableInfo fieldName="Change Password" Form={ChangePasswordForm} />
        </InfoList>
      </ManageAccountSection>
    </>
  );
}

export default Security;
