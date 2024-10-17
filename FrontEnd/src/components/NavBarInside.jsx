import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/logo.png';
import SidebarMenuItem from './SidebarMenuItem';

const styles = {

    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'linear-gradient(to bottom, #ff6702, #f69d5d)',
      color: 'white',
      padding: '10px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
      transition: 'width 0.3s',
      width: (isOpen) => (isOpen ? 'fit-content' : '80px'),
    },
    sidebarHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
    },
    logo: {
      width: '40px',
      height: 'auto',
      marginBottom: '10px',
    },
    logoText: {
      fontSize: '1.3em',
      textAlign: 'center',
      opacity: (isOpen) => (isOpen ? 1 : 0),  // Fade text in/out
      transition: 'opacity 0.3s',
    },
    sidebarMenu: {
      listStyle: 'none',
      padding: 0,
      marginTop: '20px',
    },
    menuItem: {
      fontSize: '1.1em',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      cursor: 'pointer',
      color: 'white',
      borderRadius: '10px',
      transition: 'background-color 0.3s, color 0.3s',
      textDecoration: 'none',
    },
    menuItemIcon: {
      fontSize: '1.2em',
      color: 'inherit',
    },
    footer: {
      fontSize: '1.1em',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      cursor: 'pointer',
      borderRadius: '10px',
      textAlign: 'left',
    },
    toggleBtn: {
      marginTop: '10px',
      zIndex: 100,
      border: 'none',
      backgroundColor: '#ffffff',
      color: '#FF7F11',
      padding: '5px 10px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    toggleBtnHover: {
      backgroundColor: '#f0f0f0',
    },
  }
  


const NavBarInside = ({ activeItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div style={styles.sidebar}>
            <div className="sidebar-header">
                <img src={icon} alt="Logo" style={styles.logo} />
                <span style={styles.logoText}>{isOpen ? 'ServiciosYa' : ' '}</span>
                <button style={styles.toggleBtn} onClick={toggleSidebar}>
                    <i className={`fas fa-angle-${isOpen ? 'left' : 'right'}`}></i>
                </button>
            </div>

            <ul style={styles.sidebarMenu}>
                <SidebarMenuItem
                    title="Mi perfil"
                    styles = {styles.menuItem}
                    isActive={activeItem === 'profile'}
                    to="/profile"
                    icon="fas fa-user-circle"
                />
                <SidebarMenuItem
                    title="Home"
                    styles = {styles.menuItem}
                    isActive={activeItem === 'home'}
                    to="/home"
                    icon="fas fa-home"
                />
                <SidebarMenuItem
                    title="Configuración"
                    isActive={activeItem === 'settings'}
                    to="/settings"
                    icon="fas fa-cog"
                />
                <SidebarMenuItem
                    title="Buscador"
                    isActive={activeItem === 'search'}
                    to="/search"
                    icon="fas fa-search"
                />
            </ul>

            <div style={styles.sidebarMenu}>
                <SidebarMenuItem
                    title="Log Out"
                    isActive={activeItem === null}
                    to="/login"
                    icon="fas fa-sign-out-alt"
                />
            </div>
        </div>
    );
};

export default NavBarInside;