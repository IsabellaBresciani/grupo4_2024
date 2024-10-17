import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    },
    serviceImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '5px',
    },
    button: {
        marginTop: '10px',
        padding: '5px 10px',
        backgroundColor: '#ff7f11',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        alignSelf: 'flex-start',
    },
    buttonHover: {
        backgroundColor: '#ff5500',
    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
    },
};

const ServiceCard = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [newService, setNewService] = useState({ id: 0, estado: 'activo', selectedService: '' });
    const [servicesAll, setServicesAll] = useState([]);

    const fetchServicesAll = async () => {
        try {
            const response = await axios.get('http://localhost:4444/api/service');
            setServicesAll(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:4444/api/user/17/servicios');  
            const uniqueServices = response.data.filter(
              (service, index, self) =>
                index === self.findIndex((s) => s.idServicio === service.idServicio)
            );  
            setServices(uniqueServices);
        } catch (err) {
            setError('Error al cargar los servicios');
        } finally {
            setLoading(false);
        }
    };
    
    const handleUpdateStatus = async (idServicio, currentState) => {
        const newStatus = currentState === 'activo' ? 'inactivo' : 'activo';
        try {
            await axios.put(`http://localhost:4444/api/user/17/servicios/${idServicio}`, {
                estado: newStatus,
            });
            fetchServices();
        } catch (error) {
            console.error('Error al actualizar el estado del servicio:', error);
        }
    };

    const handleAddService = async () => {
        try {
            const dataToSend = {
                idPersona: 17,
                idServicio: newService.selectedService, 
                estado: newService.estado,
            };

            await axios.post('http://localhost:4444/api/user/17/servicios', dataToSend);
        
            setIsModalOpen(false);
            fetchServices();
        } catch (error) {
            console.error('Error al agregar el servicio:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewService((prevService) => ({
            ...prevService,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchServicesAll(); // Fetch available services on mount
        fetchServices();    // Fetch user services
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
                            <button
                                style={styles.button}
                                onClick={() => handleUpdateStatus(service.idServicio, service.estado)}
                            >
                                {service.estado === 'activo' ? 'Marcar como inactivo' : 'Marcar como activo'}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No hay servicios asociados</p>
                )}
            </div>
            <div>
                <button style={styles.button} onClick={() => setIsModalOpen(true)}>Agregar servicio</button>
            </div>

            {isModalOpen && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h3>Agregar nuevo servicio</h3>
                        <form>
                            <div>
                                <label htmlFor="selectedService">Seleccionar un servicio</label>
                                <select
                                    id="selectedService"
                                    name="selectedService"
                                    value={newService.selectedService}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione un servicio</option>
                                    {servicesAll.map((service) => (
                                        <option key={service.idservice} value={service.idservice}>
                                            {service.description}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="estado">Estado</label>
                                <select
                                    id="estado"
                                    name="estado"
                                    value={newService.estado}
                                    onChange={handleChange}
                                >
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                            </div>
                            <button type="button" style={styles.button} onClick={handleAddService}>Agregar</button>
                            <button type="button" style={styles.button} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceCard;