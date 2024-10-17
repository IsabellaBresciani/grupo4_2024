import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const SidebarMenuItem = ({ title, isActive, to, icon }) => {
    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <li className={`menu-item ${isActive ? 'active' : ''}`}>
                <i className={`menu-icon ${icon}`}></i>
                <span className="menu-text">{title}</span>
            </li>
        </Link>
    );
};

export default SidebarMenuItem;