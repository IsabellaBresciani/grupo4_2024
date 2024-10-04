import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css';
import icon from '../assets/logo.png';
import SidebarMenuItem from './SidebarMenuItem';

const Sidebar = ({ activeItem }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
                <img src={icon} alt="Icono" className="sidebar-icon" />
                <span className={`logo-text ${isOpen ? '' : 'hidden'}`}>ServiciosYa</span>

                <button className="toggle-btn" onClick={toggleSidebar}>
                    {isOpen ? <i className="fas fa-angle-left"></i> : <i className="fas fa-angle-right"></i>}
                </button>
            </div>

            <ul className="sidebar-menu">
                <SidebarMenuItem title="Mi perfil" isActive={activeItem === 'profile'} to="/profile" icon="fas fa-user-circle" />
                <SidebarMenuItem title="Home" isActive={activeItem === 'home'} to="/home" icon="fas fa-home" />
                <SidebarMenuItem title="Configuración" isActive={activeItem === 'settings'} to="/settings" icon="fas fa-cog" />
                <SidebarMenuItem title="Buscador" isActive={activeItem === 'search'} to="/search" icon="fas fa-search" />
            </ul>

            <div className="sidebar-menu">
                <SidebarMenuItem title="Log Out" isActive={activeItem === null} to="/login"  icon="fas fa-sign-out-alt" />
               
            </div>   
       
        </div>
    );
};

export default Sidebar;