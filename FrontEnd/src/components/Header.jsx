import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'; // Asegúrate de crear el archivo CSS correspondiente

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">ServiciosYa</Link> {/* Aquí puedes usar un logo si lo tienes */}
        </div>
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;