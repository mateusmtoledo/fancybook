import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserContext } from '../../../contexts/UserContext';
import PersonalInfo from '../PersonalInfo';

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
        <PersonalInfo />
      </UserContext.Provider>,
    );
    expect(screen.getByText(/photo/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/bio/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
  });

  it('displays user information', () => {
    render(
      <UserContext.Provider value={{ user }}>
        <PersonalInfo />
      </UserContext.Provider>,
    );
    expect(screen.getByAltText(/john's avatar/i)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe@fancybook.com')).toBeInTheDocument();
    expect(screen.getByText('I am john doe.')).toBeInTheDocument();
  });
});
