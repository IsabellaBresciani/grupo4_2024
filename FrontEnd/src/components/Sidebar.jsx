import React, { useState } from 'react';
import '../css/Sidebar.css';
import icon from '../assets/logo.png'; // Ajusta la ruta según donde tengas la imagen

const Sidebar = () => {
    // Estado para controlar si la sidebar está visible o no
    const [isOpen, setIsOpen] = useState(true);

    // Función para alternar la visibilidad de la sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
                <img src={icon} alt="Icono" className="sidebar-icon" />
                <span className={`logo-text ${isOpen ? '' : 'hidden'}`}>ServiciosYa</span>

                {/* Botón para abrir/cerrar la sidebar */}
                <button className="toggle-btn" onClick={toggleSidebar}>
                    {isOpen ? <i className="fas fa-angle-left"></i> : <i className="fas fa-angle-right"></i>}
                </button>
            </div>

            <ul className="sidebar-menu">
                <li className="menu-item">
                    <i className="fas fa-user-circle"></i>
                    <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>Mi perfil</span>
                </li>
                <li className="menu-item">
                    <i className="fas fa-home"></i>
                    <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>Home</span>
                </li>
                <li className="menu-item">
                    <i className="fas fa-cog"></i>
                    <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>Configuración</span>
                </li>
                <li className="menu-item">
                    <i className="fas fa-search"></i>
                    <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>Buscador</span>
                </li>
            </ul>

            <div className="sidebar-footer">
                <i className="fas fa-sign-out-alt"></i>
                <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>Cerrar sesión</span>
            </div>
        </div>
    );
};

export default Sidebar;