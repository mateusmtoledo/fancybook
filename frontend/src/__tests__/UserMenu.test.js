import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserContext } from '../contexts/UserContext';
import userEvent from '@testing-library/user-event';
import UserMenu from '../components/Header/UserMenu';
import { MemoryRouter } from 'react-router-dom';

const user = {
  _id: 'johnsid',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  avatar: 'https://someurl/john.png',
};

document.addEventListener = jest.fn();

describe('UserMenu component', () => {
  it('renders button to open menu', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider
          value={{
            user,
          }}
        >
          <UserMenu />
        </UserContext.Provider>
      </MemoryRouter>,
    );
    const openMenuButton = screen.getByTitle(/open user menu/i);
    expect(openMenuButton).toBeInTheDocument();
  });

  describe('when menu is open', () => {
    it("renders current user's name and avatar", () => {
      render(
        <MemoryRouter>
          <UserContext.Provider
            value={{
              user,
            }}
          >
            <UserMenu />
          </UserContext.Provider>
        </MemoryRouter>,
      );
      const openMenuButton = screen.getByTitle(/open user menu/i);
      userEvent.click(openMenuButton);
      const usersFullName = screen.getByText('John Doe');
      const usersAvatar = screen.getAllByAltText(/john's avatar/i);
      expect(usersFullName).toBeInTheDocument();
      expect(usersAvatar.length).toBe(2);
    });

    it('renders log out button', () => {
      render(
        <MemoryRouter>
          <UserContext.Provider
            value={{
              user,
            }}
          >
            <UserMenu />
          </UserContext.Provider>
        </MemoryRouter>,
      );
      const openMenuButton = screen.getByTitle(/open user menu/i);
      userEvent.click(openMenuButton);
      const logoutButton = screen.getByText(/sign out/i);
      expect(logoutButton).toBeInTheDocument();
    });
  });
});

describe('log out button', () => {
  it('calls logout fn when clicked', () => {
    const logout = jest.fn();
    render(
      <MemoryRouter>
        <UserContext.Provider
          value={{
            user,
            logout,
          }}
        >
          <UserMenu />
        </UserContext.Provider>
      </MemoryRouter>,
    );
    const openMenuButton = screen.getByTitle(/open user menu/i);
    userEvent.click(openMenuButton);
    const logoutButton = screen.getByText(/sign out/i);
    userEvent.click(logoutButton);
    expect(logout).toBeCalled();
  });
});
