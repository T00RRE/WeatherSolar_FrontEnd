import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <LoadingSpinner size="lg" message={message || 'Ładowanie...'} />
  </div>
);

export default LoadingScreen;
