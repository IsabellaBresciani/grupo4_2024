import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
    button: {
        fontSize: '16px',
        marginTop: '10px',
        padding: '5px 10px',
        backgroundColor: '#ff7f11',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        alignSelf: 'center',
    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        display: 'flex',
        width: '50%',
        gap: '10px',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        width: '500px',
    },
    modalInput: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '1rem',
        outline: 'none',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
    },
    buttonNS: {
        padding: '10px 20px',
        backgroundColor: '#ff7f11',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        minWidth: '100px',
        height: '40px',
    },
};

const AddServiceButton = ({ fetchServices }) => {
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

    useEffect(() => {
        fetchServicesAll();
    }, []);

    const handleAddService = async () => {
        try {
            const userName = String(localStorage.getItem('usuario'));
            const userData = await axios.get(`http://localhost:4444/api/user/${userName}`);
            const dataToSend = {
                idPersona: userData.data.id,
                idServicio: newService.selectedService,
                estado: newService.estado,
            };
            await axios.post(`http://localhost:4444/api/user/${userData.data.id}/servicios`, dataToSend);
            setIsModalOpen(false);
            fetchServices();  // Actualizar la lista de servicios en ServiceCard
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

    return (
        <div>
            <button style={styles.button} onClick={() => setIsModalOpen(true)}>Agregar servicio</button>
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
                                    style={styles.modalInput}
                                >
                                    <option value="">Seleccione un servicio</option>
                                    {servicesAll.map((service) => (
                                        <option 
                                            key={service.idservice} 
                                            value={service.idservice}>
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
                                    style={styles.modalInput}
                                >
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                            </div>
                            <div style={styles.buttonsContainer}>
                                <button type="button" style={styles.buttonNS} onClick={handleAddService}>Agregar</button>
                                <button type="button" style={styles.buttonNS} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddServiceButton;
