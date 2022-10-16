import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import EDIT_ICON from "../img/edit.svg";
import Avatar from "./Avatar";

const EditableInfoButton = styled.button`
  display: flex;
  width: 100%;
  padding: 16px;
  gap: 8px;
  text-align: left;
  align-items: center;
  font-size: 0.9rem;
  font-family: 'Outfit';
  :hover {
    background-color: #FFFFFF0A;
  }
`;

const FieldName = styled.p`
  font-weight: 700;
  flex: 0 0 130px;
`

const FieldValue = styled.p`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

function EditableInfo({ fieldName, avatar, fieldValue, Form }) {
  const { user } = useContext(UserContext);
  const [formVisible, setFormVisible] = useState(false);

  return (
    <EditableInfoButton onClick={() => setFormVisible(true)}>
      <FieldName>{fieldName}</FieldName>
      <FieldValue>{avatar ? <Avatar size="64px" user={user} /> : fieldValue}</FieldValue>
      <img width="20px" src={EDIT_ICON} alt="Edit" />
      {formVisible &&
        <Form setFormVisible={setFormVisible} />}
    </EditableInfoButton>
  );
}

export default EditableInfo;
