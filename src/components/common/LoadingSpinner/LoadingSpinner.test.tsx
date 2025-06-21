import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText('Ładowanie...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    const customMessage = 'Pobieranie danych...';
    render(<LoadingSpinner message={customMessage} />);
    
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('renders without message when message is empty', () => {
    render(<LoadingSpinner message="" />);
    
    expect(screen.queryByText('Ładowanie...')).not.toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);
    expect(document.querySelector('.h-4')).toBeInTheDocument();

    rerender(<LoadingSpinner size="lg" />);
    expect(document.querySelector('.h-12')).toBeInTheDocument();
  });
});