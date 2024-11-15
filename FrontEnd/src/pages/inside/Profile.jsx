import React from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import ServiceCard from '../../components/ServiceCard';
import PostCard from '../../components/PostCard';
import LayoutInside from '../../components/LayoutInside';
import AddServiceButton from '../../components/AddServiceButton';
import AddPostButton from '../../components/AddPostButton';

const styles = {

    profileContent: {       
        padding: '20px',
        flexGrow: 1,
        overflowY: 'auto',
        margin: "2vw"
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        flexDirection: 'column',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

    },
    serviceCards: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: '30px',
        fontWeight: '600',
        marginBottom: '15px',
        marginTop: '10px',
    },
    Container: {
        display: 'flex',
    
        gap: '50px',
    },
    PostCards: {
        display: 'flex',
        flexWrap: 'wrap',
    
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '60vw',
    },
    
};

const Profile = () => {

    return (
        <LayoutInside activeItem="profile">  
         
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
                        <div style={styles.PostCards}>
                            <PostCard usuario="me"/>                              
                        </div>
                    </div>
                </div>

        </LayoutInside>
    );
};

export default Profile;