import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const styles = {
  navbar: {
      backgroundColor: '#333',
      padding: '10px 20px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  navbarBrand: {
      color: '#ff5722',
      fontSize: '1.5em',
      fontWeight: 'bold',
      transition: 'color 0.3s ease',
  },
  navbarLink: {
      color: '#ffffff',
      margin: '0 15px',
      padding: '10px 15px',
      borderRadius: '5px',
      transition: 'background-color 0.3s, color 0.3s',
  },
  activeLink: {
      backgroundColor: '#ffcc80',
      color: '#333',
  },
  navbarToggler: {
      border: 'none',
  },
};

function NavBarOutside() {
  return (
      <nav style={styles.navbar} className="navbar navbar-expand-lg">
          <div className="container-fluid">
              <button
                  style={styles.navbarToggler}
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
              >
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                          <Link style={styles.navbarLink} className="nav-link" to="/home">Home</Link>
                      </li>
                      <li className="nav-item">
                          <Link style={styles.navbarLink} className="nav-link" to="/contact">Contact</Link>
                      </li>
                      <li className="nav-item">
                          <Link style={styles.navbarLink} className="nav-link" to="/login">Log In</Link>
                      </li>
                      <li className="nav-item">
                          <Link style={styles.navbarLink} className="nav-link" to="/register">Sign Up</Link>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
  );
}

export default NavBarOutside;