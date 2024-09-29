import React from 'react';
import NavbarWithoutLogin from './NavbarWithoutLogin';
import Footer from './Footer';
import '../css/LayoutWithoutLogin.css'; 

function LayoutWithoutLogin({ children }) {
  return (
    <div >
      <NavbarWithoutLogin />
      { children }
      <Footer />
    </div>
  );
}

export default LayoutWithoutLogin;