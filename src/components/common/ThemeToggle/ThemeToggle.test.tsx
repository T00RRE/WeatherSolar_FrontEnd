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
    
    // Sprawdź początkowy stan (light theme - moon icon)
    expect(screen.getByTestId('moon-icon') || screen.getByLabelText(/switch to dark theme/i)).toBeInTheDocument();
    
    // Kliknij przycisk
    fireEvent.click(button);
    
    // Sprawdź czy zmienił się na dark theme (sun icon)
    expect(screen.getByTestId('sun-icon') || screen.getByLabelText(/switch to light theme/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('aria-label');
    expect(button.getAttribute('aria-label')).toMatch(/switch to (dark|light) theme/i);
  });
});