import styled from "styled-components";
import USERS_ICON from "../img/users.svg";
import HOME_ICON from "../img/home.svg";
import { useContext } from "react";
import { UserContext } from "src/contexts/UserContext";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const NavStyled = styled.nav`
  flex: 0 0.7 250px;
  min-width: 150px;
  
  @media (max-width: 650px) {
    flex: 0 0 max-content;
  }
`;

const NavList = styled.ul`
  padding: 16px 8px;

  @media (max-width: 650px) {
    display: flex;
    padding: 8px;
    padding-bottom: 0;
  }
`;

const NavLink = styled(Link)`
  padding: 8px;
  border-radius: 8px;
  display: flex;
  gap: 8px;
  font-size: 1.2rem;
  font-family: 'Outfit', sans-serif;
  align-items: center;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover {
    background-color: #FFFFFF1A;
  }

  @media (max-width: 650px) {
    justify-content: center;
  }
  
  @media (max-width: 400px) {
    p {
      display: none;
    }
  }
`;

const NavItem = styled.li`
  overflow: hidden;
  @media (max-width: 650px) {
    flex: 1;
  }
`;

function Nav() {
  const { user } = useContext(UserContext);

  return (
    <NavStyled>
      <NavList>
        <NavItem>
          <NavLink to={`/user/${user._id}`}>
            <Avatar
              size="40px"
              user={user}
            />
            <p>
              {user.fullName}
            </p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/">
            <img
              src={HOME_ICON}
              alt="Home"
              width="40px"
              height="40px"
            />
            <p>
              Home
            </p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/friends">
            <img
              src={USERS_ICON}
              alt="Friends"
              width="40px"
              height="40px"
            />
            <p>Friends</p>
          </NavLink>
        </NavItem>
      </NavList>
    </NavStyled>
  );
}

export default Nav;
