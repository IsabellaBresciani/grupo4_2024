import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
    profileCard: {
        display: 'flex',
        alignItems: 'center',
        border: '2px solid rgba(255, 135, 16, 0.8)',
        borderRadius: '10px',
        padding: '10px',
        maxWidth: '1000px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        margin: '20px 0',
        textDecoration: 'none',
        color: 'inherit',
    },
    profileImage: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: '20px',
    },
    profileDetails: {
        flexGrow: 1,
        overflow: 'hidden',
    },
    profileDetailsHeader: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 'bold',
    },
    profileDetailsText: {
        margin: '5px 0',
        color: '#555',
        fontSize: '14px',
    },
    profileRating: {
        display: 'flex',
        gap: '5px',
        fontSize: '20px',
        color: '#ffc107',
    },
    serviceList: {
        marginTop: '10px',
    },
};

function ProfileCard(props) {
    const { usuario, name, description, img, location } = props; 
    const [userName, setUserName] = useState("");
   
    useEffect(() => {
        if (usuario == "me") {
            usuario = String(localStorage.getItem('usuario'));
            console.log(usuario)
            setUserName(usuario);
        }
    }, []);

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchServices = async () => {
        try {
           
            const response = await axios.get(`http://localhost:4444/api/user/${usuario}/servicios`);
            const uniqueServices = response.data.filter(
                (service, index, self) =>
                    index === self.findIndex((s) => s.idServicio === service.idServicio)
            );
            
            setServices(uniqueServices);
        } catch (err) {
            
            if (err.response && err.response.status === 404) {
                setError([]);
            } else {
                setError('Error al cargar los servicios.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, [userName]);
  
    return (
        <Link to={userName === usuario ? `/profile` : `/profile/${usuario}`} style={styles.profileCard}>
            {/* Profile image */}
            <img 
                src={img}
                alt="Profile" 
                style={styles.profileImage} 
            />
            
            {/* Text container */}
            <div style={styles.profileDetails}>
                <h3 style={styles.profileDetailsHeader}>{name}</h3>
                <p style={styles.profileDetailsText}>{description}</p>
                <p style={styles.profileDetailsText}>Localidad: {location}</p>

                {/* Services list */}
                <div style={styles.serviceList}>
                    <h4 style={{ margin: 0 }}>Servicios:</h4>
                    {services.length > 0 ? (
                        services.map((service) => (
                            <p key={service.idServicio} style={styles.profileDetailsText}>{service.description}</p>
                        ))
                    ) : (
                        <p style={styles.profileDetailsText}>No hay servicios disponibles.</p>
                    )}
                </div>

                {/* Rating with stars */}
                <div style={styles.profileRating}>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                </div>
            </div>
        </Link>
    );
}

export default ProfileCard;