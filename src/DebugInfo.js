import React, { useState, useEffect } from 'react';

const DebugInfo = () => {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const handleError = (event) => {
      setErrors(prev => [...prev, {
        type: 'Error',
        message: event.error?.message || 'Unknown error',
        stack: event.error?.stack || 'No stack trace'
      }]);
    };

    const handleUnhandledRejection = (event) => {
      setErrors(prev => [...prev, {
        type: 'Unhandled Promise Rejection',
        message: event.reason?.message || 'Unknown rejection',
        stack: event.reason?.stack || 'No stack trace'
      }]);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '10px',
      fontSize: '12px',
      zIndex: 10000,
      maxWidth: '500px',
      maxHeight: '80vh',
      overflow: 'auto',
      fontFamily: 'monospace'
    }}>
      <div><strong>Vercel Debug Info:</strong></div>
      <div>REACT_APP_BASE_URL: {process.env.REACT_APP_BASE_URL || 'NOT SET'}</div>
      <div>REACT_APP_IMAGE_URL: {process.env.REACT_APP_IMAGE_URL || 'NOT SET'}</div>
      <div>REACT_APP_FRONTEND_PROTOCOL: {process.env.REACT_APP_FRONTEND_PROTOCOL || 'NOT SET'}</div>
      <div>REACT_APP_FRONTEND_DOMAIN: {process.env.REACT_APP_FRONTEND_DOMAIN || 'NOT SET'}</div>
      <div>Window: {typeof window !== 'undefined' ? 'Available' : 'Not Available'}</div>
      <div>Location: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</div>
      <div>User Agent: {typeof window !== 'undefined' ? window.navigator.userAgent.substring(0, 50) + '...' : 'N/A'}</div>
      <div>Document Ready: {typeof document !== 'undefined' ? document.readyState : 'N/A'}</div>
      <div>Body Children: {typeof document !== 'undefined' ? document.body.children.length : 'N/A'}</div>
      
      {errors.length > 0 && (
        <div>
          <div><strong>Errors ({errors.length}):</strong></div>
          {errors.map((error, index) => (
            <div key={index} style={{ color: 'red', marginTop: '5px' }}>
              <div>{error.type}: {error.message}</div>
              <div style={{ fontSize: '10px', color: '#ccc' }}>{error.stack}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DebugInfo;