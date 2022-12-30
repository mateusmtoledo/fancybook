import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OAuthButton from '../OAuthButton';

describe('OAuthButton', () => {
  it('renders icon', () => {
    render(
      <OAuthButton name="Google" icon="http://someiconurl.com" url="someurl" />,
    );
    expect(screen.getByAltText('Google').src).toBe('http://someiconurl.com/');
  });

  it('renders name', () => {
    render(<OAuthButton name="Google" icon="someicon" url="someurl" />);
    expect(screen.getByText('Google')).toBeInTheDocument();
  });

  it('links to the received url', () => {
    render(<OAuthButton name="Google" icon="someicon" url="someurl" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'someurl');
  });
});
