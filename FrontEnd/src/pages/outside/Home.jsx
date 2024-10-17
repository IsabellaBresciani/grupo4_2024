import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutOutside from '../../components/LayoutOutside';

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },
    searchBar: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    serviceGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    },
    serviceCard: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
    },
    serviceImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
    h1: {
        fontSize: '2em',
        marginBottom: '10px',
    },
    h3: {
        fontSize: '1.5em',
        marginBottom: '5px',
    },
    p: {
        fontSize: '1em',
        color: '#555',
    },
};

function Home() {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerms] = useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchTerms(value);
        // Assuming you filter services based on the service name
        setServices(prevServices => prevServices.filter(service => service.name.includes(value)));
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:4444/api/service');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []); // Added empty dependency array to run once on mount

    return (
        <LayoutOutside> 
            <div style={styles.container}>
                <h1 style={styles.h1}>Servicios</h1>
                <p style={styles.p}>Todos los servicios a la puerta de tu casa</p>

                <input 
                    type="text" 
                    onChange={handleChange} 
                    placeholder="Hinted search text" 
                    style={styles.searchBar} 
                />

                <div style={styles.serviceGrid}>
                    {services.map((service) => (
                        <div style={styles.serviceCard} key={service.id}>
                            <h3 style={styles.h3}>{service.name}</h3>
                            <img 
                                style={styles.serviceImage} 
                                src={service.imagen} 
                                alt={service.name} 
                            />
                            <p style={styles.p}>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </LayoutOutside> 
    );
}

export default Home;