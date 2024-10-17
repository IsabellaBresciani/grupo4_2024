import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem.jsx";
import { MdMenu } from "react-icons/md";
import icon from '../assets/logo.png';
import '../css/Styles.css';

const styles = {
    sidebar: {
        width: 'fit-content',
        height: '100vh',
        background: 'linear-gradient(to bottom, #ff6702, #f69d5d)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px',
        position: 'fixed',
        left: 0,
        top: 0,
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
    },
    sidebarHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', 
        marginBottom: '20px',
    },
    sidebarIcon: {
        width: '40px',
        height: 'auto',
        marginBottom: '10px',
    },
    logoText: {
        color: 'white',
        fontSize: '1.3em',
        textAlign: 'center',
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
        transition: 'background-color 0.3s, color 0.3s',
        color: 'white',
        borderRadius: '10px',
        textAlign: 'left',
    },
    toggleBtn: {
        position: 'relative',
        marginTop: '10px',
        zIndex: 100,
        border: 'none',
        backgroundColor: '#ffffff',
        color: '#FF7F11',
        padding: '5px 10px',
        borderRadius: '5px',
        alignSelf: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
    }
};

const SideBarCopied = props => {
    const [isOpen, setIsOpen] = useState(true);
    const [isHidden, setIsHidden] = useState(true);
    const [whiteSpaceStyle, setWhiteSpaceStyle] = useState({
        zIndex: 0,
        backgroundColor: "rgba(0,0,0,0)",
    });

    const toggleSidebar = () => setIsOpen(!isOpen);
    
    const resize = () => setIsHidden(window.innerWidth <= 768);

    const toggleMenu = () => {
        isHidden ? showMenu() : hideMenu();
    };

    const showMenu = () => {
        setIsHidden(false);
        setWhiteSpaceStyle({
            zIndex: 990,
            backgroundColor: "rgba(100,100,100,0.3)",
        });
    };

    const hideMenu = () => {
        setIsHidden(true);
        setWhiteSpaceStyle({
            zIndex: 0,
            backgroundColor: "rgba(0,0,0,0)",
        });
    };

    useEffect(() => {
        window.addEventListener("resize", resize);
        setIsHidden(window.innerWidth <= 768);
    }, []);

    return (
        <>
            <div className="menu-button" onClick={toggleMenu}>
                <MdMenu size="2em" />
            </div>
            
            <div className={`menu ${isHidden ? 'hidden' : ''}`} id="menu">
                <div style={styles.sidebarHeader}>
                    <img src={icon} alt="Logo" style={styles.sidebarIcon} />
                    <span style={styles.logoText}>{isOpen ? 'ServiciosYa' : ' '}</span>
                    <button 
                        style={styles.toggleBtn} 
                        onClick={toggleSidebar}
                    >
                        <i className={`fas fa-angle-${isOpen ? 'left' : 'right'}`}></i>
                    </button>
                </div>
                {props.menu.map((item, index) => (
                    typeof item.hr === "undefined" ? (
                        <MenuItem
                            key={index}
                            id={index}
                            icon={item.icon}
                            text={item.text}
                            link={item.link}
                        />
                    ) : <hr key={index} />
                ))}
            </div>
            <div
                id="menu-whitespace-target"
                hidden={isHidden}
                onClick={hideMenu}
                style={whiteSpaceStyle}
            />
        </>
    );
};

export default SideBarCopied;