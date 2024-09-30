import React from 'react';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <body >
      <Navbar />
      { children }
    </body>
  );
}

export default Layout;