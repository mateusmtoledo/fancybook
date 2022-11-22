import USERS_ICON from '../img/users.svg';
import HOME_ICON from '../img/home.svg';
import { useContext } from 'react';
import { UserContext } from 'src/contexts/UserContext';
import Avatar from './UserDisplayInfo/Avatar';
import { NavList, NavStyled, NavItem } from 'src/styles/Nav';

function Nav() {
  const { user } = useContext(UserContext);

  return (
    <NavStyled>
      <NavList>
        <NavItem to={`/user/${user._id}`}>
          <Avatar size="40px" user={user} />
          <p>{user.fullName}</p>
        </NavItem>
        <NavItem to="/">
          <img src={HOME_ICON} alt="Home" width="40px" height="40px" />
          <p>Home</p>
        </NavItem>
        <NavItem to="/friend-requests">
          <img
            src={USERS_ICON}
            alt="Friend requests"
            width="40px"
            height="40px"
          />
          <p>Requests</p>
        </NavItem>
      </NavList>
    </NavStyled>
  );
}

export default Nav;
