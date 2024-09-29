import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../css/Footer.css'; 

function Footer() {
  return (
    <footer >
      <div className="container text-center">
        <span className="text-muted">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </span>
        <ul className="list-inline mt-2">
          <li className="list-inline-item">
            <Link className="text-decoration-none" to="/about">About</Link>
          </li>
          <li className="list-inline-item">
            <Link className="text-decoration-none" to="/privacy">Privacy Policy</Link>
          </li>
          <li className="list-inline-item">
            <Link className="text-decoration-none" to="/terms">Terms of Use</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;