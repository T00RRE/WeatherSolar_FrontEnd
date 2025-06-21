import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../../test/test-utils';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders theme toggle button', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    expect(screen.getByTestId('moon-icon') || screen.getByLabelText(/switch to dark theme/i)).toBeInTheDocument();
    
    fireEvent.click(button);
    
    expect(screen.getByTestId('sun-icon') || screen.getByLabelText(/switch to light theme/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('aria-label');
    expect(button.getAttribute('aria-label')).toMatch(/switch to (dark|light) theme/i);
  });
});