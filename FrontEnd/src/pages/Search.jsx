import React from 'react';
import Sidebar from '../components/Sidebar';  // Asegúrate de que esta ruta sea correcta
import ProfileHeader from '../components/ProfileHeader'; // Componentes que mencionaste inicialmente
import ProfileDescription from '../components/ProfileDescription';
import ServiceCard from '../components/ServiceCard';
import PostCard from '../components/PostCard';

const Search = () => {
    return (
        <div className="profile-page">
            <Sidebar />  {/* La Sidebar ajustada */}
            <div className="profile-content">
                <ProfileHeader />  {/* Componente de cabecera del perfil */}
                <ProfileDescription />  {/* Descripción del perfil */}
                <div className="services-section">
                    <h2>Mis Servicios</h2>
                    <div className="service-cards">
                        {/* Aquí puedes mapear los servicios del usuario */}
                        <ServiceCard />
                        <ServiceCard />
                        <ServiceCard />
                    </div>
                </div>
                <div className="posts-section">
                    <h2>Mis Publicaciones</h2>
                    <div className="post-cards">
                        {/* Aquí puedes mapear las publicaciones del usuario */}
                        <PostCard />
                        <PostCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;