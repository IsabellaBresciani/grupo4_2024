import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProfileHeader from '../components/ProfileHeader';
import ServiceCard from '../components/ServiceCard';
import PostCard from '../components/PostCard';
import '../css/Profile.css';

const Profile = () => {
    const [services, setServices] = useState([
        {
            id: 1,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP-szK1VYsCqRCdWCsmiRQFYc-rUUSWQO8GA&s',
            title: 'Jardinería',
            description: 'Descripción corta del servicio.',
            rating: 4.5
        },
        {
            id: 2,
            image: 'https://lavado-de-cisternas.com/wp-content/uploads/2021/10/plomeros-clean-center.jpg',
            title: 'Plomeria',
            description: 'Descripción corta del servicio.',
            rating: 4
        },
        {
            id: 3,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-qVgFyo43RDWxwfeHNV6JY3GdVQSc0laBQw&s%22',
            title: 'Electricista',
            description: 'Descripción corta del servicio.',
            rating: 4.8
        }
    ]);

    const [posts, setPosts] = useState([
        {
            id: 1,
            user: 'Usuario01',
            date: '01/01/2024',
            content: 'Descripción de la publicación.',
            image: 'ruta/a/imagen4.jpg'
        },
        {
            id: 2,
            user: 'Usuario01',
            date: '02/01/2024',
            content: 'Otra descripción de la publicación.',
            image: 'ruta/a/imagen5.jpg'
        }
    ]);

    const handleEditService = (updatedService) => {
        const updatedServices = services.map((service) =>
            service.id === updatedService.id ? updatedService : service
        );
        setServices(updatedServices); // Actualiza el estado de los servicios con los nuevos datos
    };

    const handleEditPost = (updatedPost) => {
        const updatedPosts = posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
        );
        setPosts(updatedPosts); // Actualiza el estado de las publicaciones
    };

    return (
        <div className="profile-page">
            <Sidebar />
            <div className="profile-content">
                <ProfileHeader />

                {/* Sección de Servicios */}
                <div className="services-section">
                    <div className="service-cards">
                            <ServiceCard
                                key={services[0].id}
                                service={services[0].title}
                                onEdit={handleEditService}
                            />
                
                    </div>
                </div>

                {/* Sección de Publicaciones */}
                <div className="posts-section">
                    <h2>Mis Publicaciones</h2>
                    <div className="post-cards">
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onEdit={handleEditPost}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;