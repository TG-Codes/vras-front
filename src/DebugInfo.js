import React from 'react';

const DebugInfo = () => {
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
      maxWidth: '400px',
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
    </div>
  );
};

export default DebugInfo;