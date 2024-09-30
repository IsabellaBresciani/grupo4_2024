import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../css/Footer.css'; 

function Footer() {
  return (
    <footer>
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

      {/* Nueva sección de categorías y redes sociales */}
      <div className="footer-container mt-4">
        <div className="footer-left">
          {/* Iconos de redes sociales */}
          <div className="social-icons">
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-column">
            <h4>Categorías</h4>
            <ul>
              <li>Plomería</li>
              <li>Jardinería</li>
              <li>Paseadores</li>
              <li>Lava Autos</li>
              <li>Peluquería</li>
              <li>Aires Acondicionados</li>
              <li>Electricistas</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>More</h4>
            <ul>
              <li>Pileteros</li>
              <li>Prototyping</li>
              <li>Development features</li>
              <li>Design systems</li>
              <li>Blog</li>
              <li>Support</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>More</h4>
            <ul>
              <li>Best practices</li>
              <li>Colors</li>
              <li>Color wheel</li>
              <li>Support</li>
              <li>Developers</li>
              <li>Resource library</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;