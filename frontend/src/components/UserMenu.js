import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import Card from "../styles/Card";
import Avatar from "./Avatar";
import LOGOUT_ICON from "../img/log-out.svg";
import { Link } from "react-router-dom";

const UserMenuDropdown = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 300px;
  z-index: 1;

  hr {
    border: none;
    border-top: 1px solid var(--color-gray-dark);
    width: 100%;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 700;
`;

const UserFullName = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  width: fit-content;
`;

const ManageAccountButton = styled.button`
  border: 1px solid var(--color-gray-dark);
  background-color: var(--color-brown-light);
  padding: 8px 16px;
  border-radius: 32px;
  width: max-content;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
`;

const UserEmail = styled.p`
  font-size: 0.9rem;
`;

const CurrentUser = styled.div`
  display: flex;
  gap: 24px;
`;

const RightSideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const UserMenuContainer = styled.div`
  position: relative;
`;

function UserMenu() {
  const { user, logout } = useContext(UserContext);
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  const menuContainerRef = useRef();

  useEffect(() => {
    function handleClickOut(event) {
      const path = event.composedPath();
      if (!path.includes(menuContainerRef.current)) {
        setUserMenuVisible(false);
      }
    }
    document.addEventListener('click', handleClickOut);
    return () => document.removeEventListener('click', handleClickOut);
  }, []);

  return (
    <UserMenuContainer ref={menuContainerRef}>
      <button
        onClick={() => setUserMenuVisible((prev) => !prev)}
        title="Open user menu"
      >
        <Avatar user={user} size="36px" />
      </button>
      {
        userMenuVisible &&
        <UserMenuDropdown>
          <Link to={`/user/${user._id}`}>
            <CurrentUser>
              <Avatar user={user} size="96px" />
              <RightSideContent>
                <UserFullName>{user.fullName}</UserFullName>
                <UserEmail>{user.email}</UserEmail>
              </RightSideContent>
            </CurrentUser>
          </Link>
          <Link to="/manage-account">
            <ManageAccountButton>
              Manage your account
            </ManageAccountButton>
          </Link>
          <hr />
          <LogoutButton onClick={() => logout()}>
            <img src={LOGOUT_ICON} alt="Log out" />
            <p>Sign out</p>
          </LogoutButton>
        </UserMenuDropdown>
      }
    </UserMenuContainer>
  );
}

export default UserMenu;
