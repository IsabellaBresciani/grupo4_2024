import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ProfileHeader from '../components/ProfileHeader';
import ProfileDescription from '../components/ProfileDescription';
import ServiceCard from '../components/ServiceCard';
import PostCard from '../components/PostCard';


const Profile = () => {
    return (
        <div className="profile-page">
            <Sidebar />
            <div className="profile-content">
                <ProfileHeader />
                <ProfileDescription />
                <div className="services-section">
                    <h2>Mis Servicios</h2>
                    <div className="service-cards">
                        {/* Aquí puedes mapear los servicios del usuario /}
                        <ServiceCard />
                        <ServiceCard />
                        <ServiceCard />
                    </div>
                </div>
                <div className="posts-section">
                    <h2>Mis Publicaciones</h2>
                    <div className="post-cards">
                        {/ Aquí puedes mapear las publicaciones del usuario */}
                        <PostCard />
                        <PostCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;