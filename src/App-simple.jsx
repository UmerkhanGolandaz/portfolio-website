import React from 'react';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#0f172a', 
      color: 'white', 
      minHeight: '100vh', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
        Umer Khan Portfolio
      </h1>
      <p style={{ fontSize: '1.5rem', textAlign: 'center', color: '#94a3b8' }}>
        Your amazing portfolio is loading...
      </p>
      <div style={{ 
        width: '50px', 
        height: '50px', 
        border: '4px solid #3b82f6', 
        borderTop: '4px solid transparent', 
        borderRadius: '50%', 
        animation: 'spin 1s linear infinite',
        margin: '2rem auto'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;
