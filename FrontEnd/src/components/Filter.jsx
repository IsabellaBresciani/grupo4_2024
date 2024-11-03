import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
    filterGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    comboBoxContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    comboBoxLabel: {
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '8px',
    },
    comboBox: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
    },
    sliderGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    sliderTitle: {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '0',
    },
    sliderInput: {
        maxWidth: '60%',
    },
    selectedTagsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '5px', // Espacio entre las etiquetas y el ComboBox
    },
    tag: {
        padding: '8px 12px',
        backgroundColor: '#f0f0f0',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
    },
    removeTag: {
        marginLeft: '8px',
        cursor: 'pointer',
    },
};

const Filter = () => {
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [stars, setStars] = useState(0);
    const [services, setServices] = useState([]); // Estado para almacenar los servicios

    useEffect(() => {
        // Crea una función asíncrona dentro de useEffect
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:4444/api/service'); // Cambia esta URL según tu configuración
                setServices(response.data);
            } catch (error) {
                console.error('Error al obtener los servicios:', error);
            }
        };
        // Llama a la función asíncrona
        fetchServices();
    }, []);

    const handleLocationChange = (e) => {
        const selectedLocation = e.target.value;
        if (selectedLocation && !selectedLocations.includes(selectedLocation)) {
            setSelectedLocations([...selectedLocations, selectedLocation]);
        }
    };


    const handleServiceChange = (e) => {
        const selectedService = e.target.value;
        if (selectedService && !selectedServices.includes(selectedService)) {
            setSelectedServices([...selectedServices, selectedService]);
        }
    };

    const removeLocation = (locationToRemove) => {
        setSelectedLocations(selectedLocations.filter(loc => loc !== locationToRemove));
    };
    const removeService = (serviceToRemove) => {
        setSelectedServices(selectedServices.filter(ser => ser !== serviceToRemove));
    };

    return (
        <div className="search-filter">
            <div className="filters-container">
                <div style={styles.filterGroup}>


                    {/* ComboBox para Localidades */}
                    <div style={styles.comboBoxContainer}>
                        <label htmlFor="combo-box" style={styles.comboBoxLabel}>Seleccione una localidad:</label>
                        <select
                            id="combo-box"
                            style={styles.comboBox}
                            onChange={handleLocationChange}
                            value=""
                        >
                            <option value="" disabled>--Elija una localidad--</option>
                            <option value="La Plata">La Plata</option>
                            <option value="Berisso">Berisso</option>
                            <option value="Ensenada">Ensenada</option>
                        </select>
                    </div>
                    {/* ComboBox para Servicios */}
                    <div style={styles.comboBoxContainer}>
                        <label htmlFor="service-combo-box" style={styles.comboBoxLabel}>Seleccione un servicio:</label>
                        <select
                            id="service-combo-box"
                            style={styles.comboBox}
                            onChange={handleServiceChange}
                            value=""
                        >
                            <option value="" disabled>--Elija un servicio--</option>
                            {services.map((service) => (
                                <option key={service.idservice} value={service.description}>
                                    {service.description}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Slider de estrellas */}
                    <div style={styles.sliderGroup}>
                        <h5 style={styles.sliderTitle}>Estrellas: {stars}</h5>
                        <input
                            style={styles.sliderInput}
                            type="range"
                            min="0"
                            max="5"
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                        />
                    </div>

                    {/* Mostrar localidades seleccionadas como etiquetas */}
                    <div style={styles.selectedTagsContainer}>
                        {selectedLocations.map((location, index) => (
                            <div key={index} style={styles.tag}>
                                {location}
                                <span
                                    style={styles.removeTag}
                                    onClick={() => removeLocation(location)}
                                >
                                    &#x2715; {/* Símbolo de "X" para eliminar */}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Mostrar servicios seleccionados como etiquetas */}
                    <div style={styles.selectedTagsContainer}>
                        {selectedServices.map((service, index) => (
                            <div key={index} style={styles.tag}>
                                {service}
                                <span
                                    style={styles.removeTag}
                                    onClick={() => removeService(service)}
                                >
                                    &#x2715; {/* Símbolo de "X" para eliminar */}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
