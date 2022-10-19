import { InfoList, AccountManagementSection } from "../../styles/AccountManagement";
import EditableInfo from "./EditableInfo";
import ChangePasswordForm from "./ChangePasswordForm";

function Security() {
  return (
    <>
      <AccountManagementSection>
        <h3>Password</h3>
        <InfoList>
          <EditableInfo fieldName="Change Password" Form={ChangePasswordForm} />
        </InfoList>
      </AccountManagementSection>
    </>
  );
}

export default Security;
