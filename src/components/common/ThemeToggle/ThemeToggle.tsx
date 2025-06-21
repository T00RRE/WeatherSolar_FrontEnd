import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-500" data-testid="sun-icon" />
      ) : (
        <Moon className="h-5 w-5 text-gray-500" data-testid="moon-icon" />
      )}
    </button>
  );
};

export default ThemeToggle;