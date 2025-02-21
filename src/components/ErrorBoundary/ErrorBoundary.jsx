import React, { useState, useEffect } from 'react';

export default function ErrorBoundary  ({ children }) {
  const [hasError, setHasError] = useState(false);

  const handleError = (error) => {
    console.error('Error caught in ErrorBoundary:', error);
    setHasError(true);
  };

  useEffect(() => {
    const errorHandler = (event) => {
      handleError(event.error);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong. Please try again later.</h1>;
  }

  return children;
};


