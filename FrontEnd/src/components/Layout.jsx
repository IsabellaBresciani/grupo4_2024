import React from 'react';
import Navbar from './NavBar';

function Layout({ children }) {
  return (
    <div style={styles}>
      <Navbar />
      { children }
    </div>
  );
}

export default Layout;