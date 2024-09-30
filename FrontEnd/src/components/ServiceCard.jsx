import React, { useState, useEffect } from 'react';  // Importa useState y useEffect de React
import axios from 'axios';  // Importa axios para hacer las llamadas HTTP
import '../css/ServiceCard.css'; // Asegúrate de crear este archivo CSS también

const ServiceCard = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [newService, setNewService] = useState({ id: 0, estado: 'activo', selectedService: '' });
    const [servicesAll, setServicesAll] = useState([]);

    useEffect(() => {
        const fetchServicesAll = async () => {
            try {
                const response = await axios.get('http://localhost:4444/api/service');
                setServicesAll(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServicesAll();
    }, []);  // Agrega un arreglo de dependencias vacío para que solo se ejecute una vez al montar el componente

    // Función para obtener los servicios del usuario
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
    
    // Función para actualizar el estado del servicio (activo/inactivo)
    const handleUpdateStatus = async (idServicio, currentState) => {
        const newStatus = currentState === 'activo' ? 'inactivo' : 'activo'; // Alterna el estado

        try {
            await axios.put(`http://localhost:4444/api/user/17/servicios/${idServicio}`, {
                estado: newStatus
            });
            fetchServices(); // Recarga los servicios para reflejar el cambio
        } catch (error) {
            console.error('Error al actualizar el estado del servicio:', error);
        }
    };

    // Manejar el envío del nuevo servicio
    const handleAddService = async () => {
        try {
            const dataToSend = {
                idPersona: 17,  // El ID de la persona
                idServicio: newService.selectedService,  // Asegúrate de enviar el ID del servicio seleccionado
                estado: newService.estado
            };

            console.log('Datos que se envían al servidor:', dataToSend);  // Verifica los datos antes de enviarlos

            await axios.post('http://localhost:4444/api/user/17/servicios', dataToSend);
        
            setIsModalOpen(false);  // Cierra el modal después de agregar el servicio
            fetchServices();  // Refresca la lista de servicios
        } catch (error) {
            console.error('Error al agregar el servicio:', error);
        }
    };

    // Manejar los cambios en el formulario del modal
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewService((prevService) => ({
            ...prevService,
            [name]: value  // Actualiza el campo correspondiente (selectedService o estado)
        }));
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
                            <h3>{service.description}</h3>  
                            <p>{service.estado === 'activo' ? 'Servicio activo' : 'Servicio dado de baja'}</p>
                            <button
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
                <button onClick={() => setIsModalOpen(true)}>Agregar servicio</button>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
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
                            <button type="button" onClick={handleAddService}>Agregar</button>
                            <button type="button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceCard;
