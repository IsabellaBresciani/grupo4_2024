import React from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import ServiceCard from '../../components/ServiceCard';
import PostCard from '../../components/PostCard';
import LayoutInside from '../../components/LayoutInside';
import AddServiceButton from '../../components/AddServiceButton';
import AddPostButton from '../../components/AddPostButton';

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
        marginTop: '10px',
    },
    Container: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '50px',
    },
    
};

const Profile = () => {

    return (
        <LayoutInside activeItem="profile">  
            <div style={styles.profilePage}>          
                <div style={styles.profileContent}>
                    <ProfileHeader />

                    {/* Sección de Servicios */}
                    <div style={styles.section}>
                        <div style={styles.Container}>
                            <h2 style={styles.heading}>Mis Servicios</h2> 
                            <AddServiceButton />
                        </div>
                        <div style={styles.serviceCards}>
                            <ServiceCard />
                        </div>
                    </div>

                    {/* Sección de Publicaciones */}
                    <div style={styles.section}>
                    <div style={styles.Container}>
                        <h2 style={styles.heading}>Mis Publicaciones</h2>
                        <AddPostButton/>
                    </div>
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