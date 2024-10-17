import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const styles = {
    footerContainer: {
        backgroundColor: '#e0e0e0',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    footerLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    socialIcons: {
        display: 'flex',
        gap: '15px',
        marginBottom: '10px',
    },
    footerRight: {
        display: 'flex',
        gap: '40px',
    },
    footerColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    footerColumnTitle: {
        fontSize: '1.2em',
        marginBottom: '10px',
    },
    footerColumnList: {
        listStyle: 'none',
        padding: 0,
    },
    footerColumnListItem: {
        marginBottom: '5px',
    },
    socialIcon: {
        fontSize: '1.5em',
        color: 'black',
        cursor: 'pointer',
    },
    socialIconHover: {
        color: '#FF7F11',
    },
    containerTextCenter: {
        marginTop: '20px',
    },
    ulFooter: {
        marginTop: '30px',
    },
};

function Footer() {
    return (
        <footer>
            <div style={styles.containerTextCenter} className="container text-center">
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

            {/* New section for categories and social media */}
            <div style={styles.footerContainer} className="mt-4">
                <div style={styles.footerLeft}>
                    {/* Social media icons */}
                    <div style={styles.socialIcons}>
                        <i style={styles.socialIcon} className="fab fa-twitter"></i>
                        <i style={styles.socialIcon} className="fab fa-instagram"></i>
                        <i style={styles.socialIcon} className="fab fa-youtube"></i>
                        <i style={styles.socialIcon} className="fab fa-linkedin"></i>
                    </div>
                </div>
                <div style={styles.footerRight}>
                    <div style={styles.footerColumn}>
                        <h4 style={styles.footerColumnTitle}>Categorías</h4>
                        <ul style={styles.footerColumnList}>
                            <li style={styles.footerColumnListItem}>Electricista</li>
                            <li style={styles.footerColumnListItem}>Plomero</li>
                            <li style={styles.footerColumnListItem}>Jardinero</li>
                            <li style={styles.footerColumnListItem}>Limpieza domestica</li>
                            <li style={styles.footerColumnListItem}>Pintor</li>
                            <li style={styles.footerColumnListItem}>Mantenimiento electrodomésticos</li>
                        </ul>
                    </div>
                    <div style={styles.footerColumn}>
                        <ul id="ulfooter" style={{ ...styles.footerColumnList, ...styles.ulFooter }}>
                            <li style={styles.footerColumnListItem}>Fletes</li>
                            <li style={styles.footerColumnListItem}>Cuidado de mascotas</li>
                            <li style={styles.footerColumnListItem}>Lavanderia</li>
                            <li style={styles.footerColumnListItem}>Carpintero</li>
                            <li style={styles.footerColumnListItem}>Instalador de aires acondicionados</li>
                            <li style={styles.footerColumnListItem}>Cerrajero</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;