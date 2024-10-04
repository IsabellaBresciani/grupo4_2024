import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProfileHeader from '../components/ProfileHeader';
import ServiceCard from '../components/ServiceCard';
import PostCard from '../components/PostCard';
import '../css/Profile.css';
import axios from 'axios'; 

const Profile = () => {
    
    const [services, setServices] = useState([ ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


 
  
    return (
        <div className="profile-page">
             <Sidebar activeItem="profile" />
            <div className="profile-content">
                <ProfileHeader />

                {/* Sección de Servicios */}
                <div className="services-section">
                    <h2>Mis Servicios</h2>
                    <div className="service-cards">
                        <ServiceCard/>
                    </div>
                </div>

                {/* Sección de Publicaciones */}
                <div className="posts-section">
                    <h2>Mis Publicaciones</h2>
                    <div className="post-cards">
                        <PostCard/>                              
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;