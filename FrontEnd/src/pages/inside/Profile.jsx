import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ProfileHeader from '../../components/ProfileHeader';
import ServiceCard from '../../components/ServiceCard';
import PostCard from '../../components/PostCard';
import LayoutInside from '../../components/LayoutInside';

const styles = {
    profilePage: {
        display: 'flex',
        height: '100vh',
    },
    profileContent: {       //Recomendaria sacar esto pq con esto se ven dos scroll bars y el contenido no ocupa toda la pantalla. no lo saco pq no estoy seguro de si tiene otra funcionalidad
        marginLeft: '5vw',
        padding: '20px',
        flexGrow: 1,
        backgroundColor: '#f9f9f9',
        overflowY: 'auto',
    },
    section: {
        marginTop: '20px',
    },
    serviceCards: {
        display: 'flex',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        justifyContent: 'left',
    },
    heading: {
        color: '#333',
        fontSize: '1.5rem',
        marginBottom: '15px',
    },
};

const Profile = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <LayoutInside>  
            <div style={styles.profilePage}>          
                <div style={styles.profileContent}>
                    <ProfileHeader />

                    {/* Sección de Servicios */}
                    <div style={styles.section}>
                        <h2 style={styles.heading}>Mis Servicios</h2>
                        <div style={styles.serviceCards}>
                            <ServiceCard />
                        </div>
                    </div>

                    {/* Sección de Publicaciones */}
                    <div style={styles.section}>
                        <h2 style={styles.heading}>Mis Publicaciones</h2>
                        <div style={styles.serviceCards}>
                            <PostCard />                              
                        </div>
                    </div>
                </div>
            </div>
        </LayoutInside>
    );
};

export default Profile;