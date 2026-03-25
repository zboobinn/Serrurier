// src/components/InitialLoader.jsx
import React from 'react';

const InitialLoader = () => {
  return (
    <div className="initial-loader-container">
      <div className="lock-wrapper">
        <div className="padlock-shackle"></div>
        <div className="padlock-body">
          <div className="keyhole"></div>
        </div>
      </div>
      <p className="loading-text" style={{color: '#f59e0b', marginTop: '30px', fontFamily: 'sans-serif', fontWeight: '500', opacity: 0.8}}>
        Serrurerie Roland...
      </p>
    </div>
  );
};

export default InitialLoader;