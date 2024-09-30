import React, { useState, useEffect } from 'react';  // Importa useState y useEffect de React
import axios from 'axios';  // Importa axios para hacer las llamadas HTTP
import '../css/ServiceCard.css'; // Asegúrate de crear este archivo CSS también

const ServiceCard = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener los servicios
    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:4444/api/user/17/servicios');  // Cambia el 17 por el idPersona dinámico si es necesario
            const uniqueServices = response.data.filter(
              (service, index, self) =>
                index === self.findIndex((s) => s.idServicio === service.idServicio)  // Filtra para evitar duplicados
            );
            setServices(uniqueServices);  // Guardar los servicios únicos
        } catch (err) {
            setError('Error al cargar los servicios');
        } finally {
            setLoading(false);
        }
    };

    // Llamar a la función cuando el componente se monta
    useEffect(() => {
        fetchServices();
    }, []);

    if (loading) return <p>Cargando servicios...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="services-section">
            <h2>Mis Servicios</h2>
            <div className="service-cards">
                {services.length > 0 ? (
                    services.map((service) => (
                        <div className="service-card" key={service.idServicio}>
                            <h3>{service.description}</h3>  {/* Mostrar la descripción del servicio */}
                            <p>{service.estado === 'activo' ? 'Servicio activo' : 'Servicio dado de baja'}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay servicios asociados</p>
                )}
            </div>
        </div>
    );
};

export default ServiceCard;