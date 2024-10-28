import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewPopup from './ReviewPopup' ;
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
    serviceImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '5px',
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        display: 'flex',
        gap: "10px",
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        padding: '100px',
        borderRadius: '8px',
        width: '500px',
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

const ServiceCard = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [newService, setNewService] = useState({ id: 0, estado: 'activo', selectedService: '' });
    const [servicesAll, setServicesAll] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAsociacionId, setSelectedAsociacionId] = useState(null);  // Estado para almacenar el idAsociacion
    const userName = localStorage.getItem('usuario');

    const fetchServicesAll = async () => {
        try {
            const response = await axios.get('http://localhost:4444/api/service');
            setServicesAll(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    useEffect(() => {
        console.log('Servicio asociado ID recibido:', selectedAsociacionId); // Log del ID
    }, [selectedAsociacionId]);

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

    const handleOpenPopup = (idAsociacion) => {
        setSelectedAsociacionId(idAsociacion);  // Guardar idAsociacion seleccionado
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedAsociacionId(null);  // Limpiar el idAsociacion al cerrar el popup
    };

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
                                style={styles.isVisible}
                                onClick={() => handleUpdateStatus(service.idServicio, service.estado)}
                                >
                                {service.estado === 'activo' ? (                                    
                                    <i className="fas fa-eye-slash"></i>
                                ) : (                                    
                                    <i className="fas fa-eye"></i>                                  
                                )}
                            </button>

                            <button style={styles.button} onClick={() => handleOpenPopup(service.idServicio)}> Ver reseñas </button>
                            </div>
                    ))
                ) : (
                    <p>No hay servicios asociados</p>
                )}
            </div>

            <ReviewPopup 
                show={showPopup} 
                onClose={handleClosePopup} 
                servicioasociado_id={selectedAsociacionId}  // Pasar idAsociacion seleccionado a ReviewPopup
            />

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