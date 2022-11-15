import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountManagementNav from '../AccountManagementNav';
import { MemoryRouter } from 'react-router-dom';

describe('AccountManagementNav', () => {
  it('renders nav items', () => {
    render(
      <MemoryRouter>
        <AccountManagementNav />
      </MemoryRouter>,
    );
    expect(screen.getByText(/personal info/i)).toBeInTheDocument();
    expect(screen.getByText(/security/i)).toBeInTheDocument();
  });
});
