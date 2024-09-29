import React from 'react';
import './Sidebar.css';
import icon from '../../assets/logo.png'; // Ajusta la ruta según donde hayas guardado la imagen


const Sidebar = () => {
    return (
        <div className="sidebar">
             
            <div className="sidebar-header">
                <img src={icon} alt="Icono" className="sidebar-icon" />
                <span className="logo-text">ServiciosYa</span>
            </div>
            <ul className="sidebar-menu">
                <li className="menu-item active">
                    <i className="fas fa-user-circle"></i>
                    Mi perfil
                </li>
                <li className="menu-item">
                    <i className="fas fa-home"></i>
                    Home
                </li>
                <li className="menu-item">
                    <i className="fas fa-cog"></i>
                    Configuración
                </li>
                <li className="menu-item">
                    <i className="fas fa-search"></i>
                    Buscador
                </li>
            </ul>
            <div className="sidebar-footer">
                <i className="fas fa-sign-out-alt"></i>
                Cerrar sesión
            </div>
        </div>
    );
}

export default Sidebar;