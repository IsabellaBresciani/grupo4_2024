import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LayoutInside from '../../components/LayoutInside';
import ProfileHeader from '../../components/ProfileHeader';
import ServiceCard from '../../components/ServiceCard';
import PostCard from '../../components/PostCard';
import AddServiceButton from '../../components/AddServiceButton';
import AddPostButton from '../../components/AddPostButton';
import {
  MDBContainer,

} from 'mdb-react-ui-kit';

const ProfileDetails = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { usuario } = useParams();
    
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4444/api/user/${usuario}`);
                setUserData(response.data);
                setError(null);
            } catch (err) {
                setError('Error al obtener los datos del usuario');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [usuario]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!userData) return <p>No user details available</p>;

    // Guard clause to ensure services and posts are defined
    const services = userData.services || [];
    const posts = userData.posts || [];

    return (
        <LayoutInside activeItem="profile-details">
            <MDBContainer className="py-5">
                <ProfileHeader usuario={usuario} />

                {/* Services Section */}
                <section>
                    <h2>Mis Servicios</h2>   
                    <ServiceCard usuario={usuario}  />
   
                </section>

                {/* Posts Section */}
                <section>
                    <h2>Mis Publicaciones</h2>
      
                    <PostCard usuario={usuario}/>
                </section>
            </MDBContainer>
        </LayoutInside>
    );
};

export default ProfileDetails;