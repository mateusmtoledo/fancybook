import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserAbout from '../UserAbout';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe('UserAbout component', () => {
  it("renders user's bio", () => {
    render(<UserAbout bio="some user bio" userLoading={false} />);
    expect(screen.getByText('some user bio')).toBeInTheDocument();
  });

  it('renders no information provided message when user does not have a bio', () => {
    render(<UserAbout bio="" userLoading={false} />);
    expect(screen.getByText('No information provided')).toBeInTheDocument();
  });
});
