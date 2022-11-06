import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResultsList from '../components/Header/SearchResultsList';
import { MemoryRouter } from 'react-router-dom';

const searchResults = [
  {
    _id: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    avatar: 'https://someurl/john.png',
  },
  {
    _id: 'janedoe',
    firstName: 'Jane',
    lastName: 'Doe',
    fullName: 'Jane Doe',
    avatar: 'https://someurl/jane.png',
  },
];

describe('SearchResultsList', () => {
  it('renders user results', async () => {
    render(
      <MemoryRouter>
        <SearchResultsList searchResults={searchResults} />
      </MemoryRouter>,
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    const johnsAvatar = screen.getByAltText(/john's avatar/i);
    expect(johnsAvatar.src).toBe(searchResults[0].avatar);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    const janesAvatar = screen.getByAltText(/jane's avatar/i);
    expect(janesAvatar.src).toBe(searchResults[1].avatar);
  });
});
