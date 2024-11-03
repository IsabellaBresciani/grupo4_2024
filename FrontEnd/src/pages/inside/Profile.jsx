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
    profileContent: {       
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
        fontSize: '30px',
        fontWeight: '600',
        marginBottom: '15px',
        marginTop: '10px',
    },
    Container: {
        display: 'flex',
        justifyContent: 'center',
        gap: '50px',
    },
    PostCards: {
        display: 'flex',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        maxWidth: '60vw',
    },
    
};

const Profile = () => {

    return (
        <LayoutInside activeItem="profile">  
            <div style={styles.profilePage}>          
                <div style={styles.profileContent}>
                    <ProfileHeader usuario="me"/>

                    {/* Sección de Servicios */}
                    <div style={styles.section}>
                        <div style={styles.Container}>
                            <h2 style={styles.heading}>Mis Servicios</h2> 
                            <AddServiceButton />
                        </div>
                        <div style={styles.serviceCards}>
                            <ServiceCard usuario="me"/>

                        </div>
                    </div>

                    {/* Sección de Publicaciones */}
                    <div style={styles.section}>
                        <div style={styles.Container}>
                            <h2 style={styles.heading}>Mis Publicaciones</h2>
                            <AddPostButton/>
                        </div>
                        <div style={styles.Container}>
                            <div style={styles.PostCards}>
                                <PostCard usuario="me"/>                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutInside>
    );
};

export default Profile;