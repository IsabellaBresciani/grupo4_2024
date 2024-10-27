import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavbarInside = ({ content, activeItem }) => {
  const styles = {
    navbar: {
        backgroundColor: '#ff8000',
        color: '#ff5722',
        minWidth: "10vw"
    },
    sidebarIcon: { 
        minWidth: "50px",
        width: "7vw",
        height: "auto",
        color: '#ffffff'
    }, 
    activeIcon: { 
      minWidth: "50px",
      width: "7vw",
      height: "auto",
      backgroundColor: '#ffffff',
      color: '#ff8000',
      borderRadius: "10px"
    }, 
    profileIcon: { 
    
      color: '#ffffff'
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
    logoText: {
      color: "white",
      fontSize: "1.3em",
      textAlign: "center", 
      transition: "opacity 0.3s ease"
    },
    spacer: {
      height: '50px'  // Adjust height as needed
    },
    content: {
      padding: '100px'
    },
    dropdownMenu: {
      backgroundColor: '#ffffff',
      border: '1px solid rgba(0,0,0,0.15)',
    },
    
    dropdownItem: {
      color: '#212529',
      '&:hover': {
        backgroundColor: '#f8f9fa'
      }
    }
  };

    return (
      <div className="container-fluid">
      <div  className="row">
          <div  style={styles.navbar}  className="col-sm-auto sticky-top">
              <div className="d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top">
                  <a href="/" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                    <img  style={styles.sidebarIcon}  src={icon} alt="Logo" className="sidebar-icon" />
                  </a>
                  <hr/>
                  <span style={styles.logoText}>ServiciosYa</span>
                  <hr/><hr/><hr/><hr/><hr/>
                  <ul  className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                      
                      <li className="nav-item">
                          
                          <a href={icon}   style={{"--bs-icon-link-transform": "translate3d(0, -.125rem, 0)"}}  className="nav-link py-3 px-2 icon-link icon-link-hover " title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                            <Link to="/profile" style={activeItem === 'profile' ? styles.activeIcon : styles.sidebarIcon}  className="bi bi-person-circle fs-1"></Link>
                          </a>
                       
                      </li>
                      <li className="nav-item">
                          
                          <a href={icon}  style={{"--bs-icon-link-transform": "translate3d(0, -.125rem, 0)"}}  className="nav-link py-3 px-2 icon-link icon-link-hover " title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                            <Link style={activeItem === 'search' ? styles.activeIcon : styles.sidebarIcon} to="/search" className="bi bi-search fs-1"></Link>
                          </a>
                       
                      </li>
                  
                      <li>
                            <a href="#"  style={{"--bs-icon-link-transform": "translate3d(0, -.200rem, 0)"}} className="nav-link py-3 px-2 icon-link icon-link-hover" title="Settings" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
                                <Link to="/config" style={activeItem === 'config' ? styles.activeIcon : styles.sidebarIcon} className="bi bi-gear fs-1"></Link>
                            </a>
                      </li>

                      <hr/><hr/><hr/><hr/><hr/>
                      <li className="nav-item">
                          
                          <a href={icon}  style={{"--bs-icon-link-transform": "translate3d(0, -.125rem, 0)"}}  className="nav-link py-3 px-2 icon-link icon-link-hover" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                            <Link to="/login" style={styles.sidebarIcon} className="bi bi-box-arrow-right fs-1"></Link>
                          </a>
                       
                      </li>
                      
                  </ul>
                  
              </div>
          </div>
          <div style={styles.content} className="col-sm p-5 min-vh-100">
              {content}
          </div>
      </div>
    </div>
  
    );
};

export default NavbarInside;