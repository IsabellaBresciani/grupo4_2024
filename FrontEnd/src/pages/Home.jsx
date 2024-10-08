import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutWithoutLogin from '../components/LayoutWithoutLogin';
import '../css/Home.css';

function Home() {
    const [services, setServices] = useState([]);
    const [searchTerm, setSerchTerms] = useState("");
   
    const handleChange = (e) => {
        const { searchTerm } = e.target;
        setSerchTerms(searchTerm);
        setServices(services.filter(service => service.name.include))
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
    });

    return (
        <LayoutWithoutLogin>
            <div className="container">
                <h1>Servicios</h1>
                <p>Todos los servicios a la puerta de tu casa</p>

                <input type="text" onChange={handleChange} placeholder="Hinted search text" className="search-bar" />

                <div className="service-grid">
                    {services.map((service) => (
                        <div className="service-card" key={service.id}>
                        <h3>{service.name}</h3>
                        <img className="service-image" src={service.imagen} alt={service.name} />
                        <p>{service.description}</p>
                    </div>
                    ))}
                </div>
            </div>
        </LayoutWithoutLogin>
    );
}

export default Home;