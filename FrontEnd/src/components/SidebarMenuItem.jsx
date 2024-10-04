import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../css/Sidebar.css';

const SidebarMenuItem = ({ title, isActive, to, icon }) => {
    return (
        <li className={`menu-item ${isActive ? 'active' : ''}`}>
            <Link to={to}>
                {/* Render the provided icon */}
                <i className={icon}></i>
                <span className="menu-text">{title}</span>
            </Link>
        </li>
    );
};

export default SidebarMenuItem;