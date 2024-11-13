import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewPopup from './ReviewPopup';

const styles = {
    servicesSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    serviceCards: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: '100%',
    },
    serviceCard: {
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        width: '260px',
        margin: '8px 30px 15px 30px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
    },
    button: {
        fontSize: '18px',
        marginTop: '10px',
        padding: '5px 10px',
        backgroundColor: '#ff7f11',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        alignSelf: 'center',
        outline: 'none',
    },
    isVisible: { 
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',  
        alignItems: 'center',
        outline: 'none',
        border: 'none',
        backgroundColor: '#fff',
        fontSize: '18px',
    },
};

const ServiceCard = (props) => {
    const [userName, setUserName] = useState(props.usuario);
    if (userName === "me") {
        const userNameFromStorage = String(localStorage.getItem('usuario'));
        setUserName(userNameFromStorage);
    }
    
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAsociacionId, setSelectedAsociacionId] = useState(0);

    const fetchServices = async () => {
        try {
            const response = await axios.get(`http://localhost:4444/api/user/${userName}/servicios`);
            const uniqueServices = response.data.filter(
                (service, index, self) =>
                    index === self.findIndex((s) => s.idServicio === service.idServicio)
            );
            setServices(uniqueServices);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('No se encontraron servicios asociados al usuario.');
            } else {
                setError('Error al cargar los servicios.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (idServicio, currentState) => {
        const newStatus = currentState === 'activo' ? 'inactivo' : 'activo';
        try {
            await axios.put(`http://localhost:4444/api/user/17/servicios/${idServicio}`, { estado: newStatus });
            fetchServices();
        } catch (error) {
            console.error('Error al actualizar el estado del servicio:', error);
        }
    };

    const handleOpenPopup = async (idServicio) => {
        const response = await axios.get(`http://localhost:4444/api/service/${userName}/${idServicio}`);
        const asociacionId = response.data.idAsociacion;
        setSelectedAsociacionId(asociacionId);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    if (loading) return <p>Cargando servicios...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={styles.servicesSection}>
            <div style={styles.serviceCards}>
                {services.length > 0 ? (
                    services.map((service) => (
                        <div style={styles.serviceCard} key={service.idServicio}>
                            <h3>{service.description}</h3>
                            <p>{service.estado === 'activo' ? 'Servicio activo' : 'Servicio dado de baja'}</p>
                            {props.usuario === "me" && (
                                <button
                                    style={styles.isVisible}
                                    onClick={() => handleUpdateStatus(service.idServicio, service.estado)}
                                >
                                    {service.estado === 'activo' ? (                                    
                                        <i className="fas fa-eye-slash"></i>
                                    ) : (                                    
                                        <i className="fas fa-eye"></i>                                  
                                    )}
                                </button>
                            )}

                            <button style={styles.button} onClick={() => handleOpenPopup(service.idServicio)}>Ver reseñas</button>
                        </div>
                    ))
                ) : (
                    <p>No hay servicios asociados.</p>
                )}
                <ReviewPopup 
                    show={showPopup} 
                    onClose={handleClosePopup} 
                    idAsociacionservi={selectedAsociacionId}  
                />
            </div>
        </div>
    );
};

export default ServiceCard;
