import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import api from "../adapters/api";
import SearchBar from "../components/SearchBar";
import { MemoryRouter } from "react-router-dom";

jest.mock('../adapters/api', () => {
  return {
    get: jest.fn(),
  }
});

beforeEach(() => {
  api.get.mockResolvedValue({
    data: {
      users: [
        {
          _id: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          fullName: 'John Doe',
          avatar: 'https://someurl/john.png',
        }
      ],
    }
  });
});

jest.useFakeTimers();

describe('SearchBar', () => {
  it('accepts user\'s input', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'john');
    expect(searchInput.value).toBe('john');
  });

  it('calls api.get with correct arguments', async () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'john');
    jest.runAllTimers()
    await screen.findByText('John Doe');
    expect(api.get).toBeCalledWith('/users?search=john');
  });
});
