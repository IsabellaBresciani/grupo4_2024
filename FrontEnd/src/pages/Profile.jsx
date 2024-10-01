import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProfileHeader from '../components/ProfileHeader';
import ServiceCard from '../components/ServiceCard';
import PostCard from '../components/PostCard';
import '../css/Profile.css';
import axios from 'axios'; 

const Profile = () => {
    
    const [posts, setPosts] = useState([]);
    const [services, setServices] = useState([ ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const handleEditPost = (updatedPost) => {
        const updatedPosts = posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
        );
        setPosts(updatedPosts); // Actualiza el estado de las publicaciones
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4444/api/publication/17/posts');  // Cambia el 17 por el idPersona dinámico si es necesario
                console.log(response.data)
                setPosts(response.data);  // Guardar los servicios únicos
            } catch (err) {
                setError('Error al cargar los posts');
            } finally {
                setLoading(false);
            }
        };
    
         // Función para obtener los servicios del usuario
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:4444/api/user/17/servicios');  // Cambia el 17 por el idPersona dinámico si es necesario
                console.log(response.data)
                setServices(response.data);  // Guardar los servicios únicos
            } catch (err) {
                setError('Error al cargar los servicios');
            } finally {
                setLoading(false);
            }
        };
        
        fetchPosts();
        fetchServices();
        
    }, []); 

    return (
        <div className="profile-page">
            <Sidebar />
            <div className="profile-content">
                <ProfileHeader />

                {/* Sección de Servicios */}
                <div className="services-section">
                    <div className="service-cards">
                        
                            <ServiceCard/>
                
                    </div>
                </div>

                {/* Sección de Publicaciones */}
                <div className="posts-section">
                    <h2>Mis Publicaciones</h2>
                    <div className="post-cards">
                        {posts.length > 0 ? (posts.map((post)=>(
                                <PostCard
                                key={post.idPublicacion}
                                post={post}
                                onEdit={handleEditPost}
                            />

                        )) ) : (
                            <p>No hay Publicaciones asociadas</p>
                        )
                    };
                                
                        
                            
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;