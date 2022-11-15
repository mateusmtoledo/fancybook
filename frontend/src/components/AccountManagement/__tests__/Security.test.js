import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserContext } from '../../../contexts/UserContext';
import Security from '../Security';

const user = {
  _id: 'johnsid',
  bio: 'I am john doe.',
  email: 'johndoe@fancybook.com',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  avatar: 'https://someurl/john.png',
};

describe('PersonalInfo component', () => {
  it('renders buttons to allow users to edit their information', () => {
    render(
      <UserContext.Provider value={{ user }}>
        <Security />
      </UserContext.Provider>,
    );
    expect(screen.getByText(/change password/i)).toBeInTheDocument();
  });
});
