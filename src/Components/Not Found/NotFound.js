import React from 'react';

const NotFound = () => {
  return (
    <div style={{display:'flex', justifyContent:'center',alignItems:'center',height:'100vh',width:'100vw'}}>
      <div style={{padding:'25px', border: '1px solid gray'}}>
        <h2>Oops! Sorry </h2>
        <p>Page Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;