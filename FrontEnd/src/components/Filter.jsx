import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
    filterContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    filterGroup: {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'space-between',
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
        
        width: '80%',
    },
    sliderGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: "20vw"
    },
    sliderTitle: {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '0',
    },
    sliderInput: {
        maxWidth: '100%',
    },
    selectedTagsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '10px',  // Add some spacing
        width: '100%'       // Ensure full width
    },
    tag: {
        padding: '8px 12px',
        backgroundColor: '#f0f0f0',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        margin: '5px'       // Add margin around tags
    },
    removeTag: {
        marginLeft: '8px',
        cursor: 'pointer',
        color: '#666'       // Make the X visible
    }
};
/*hola*/
const Filter = ({ onLocationChange, onServiceChange }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // ... fetch data
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    console.log(selectedLocation)
    const [stars, setStars] = useState(0);
    const [services, setServices] = useState([]); // Estado para almacenar los servicios
    const [locations, setLocations] = useState([]); // Estado para almacenar las localidades

    useEffect(() => {
        // Crea una función asíncrona dentro de useEffect
        const fetchServices = async () => {
            try {
                const service = await axios.get('http://localhost:4444/api/service');
                setServices(service.data);
            } catch (error) {
                console.error('Error al obtener los servicios:', error);
            }
        };

        // Crea una función asíncrona para obtener localidades
        const fetchLocations = async () => {
            try {
                const location = await axios.get('http://localhost:4444/api/localidad');
                setLocations(location.data);
            } catch (error) {
                console.error('Error al obtener las localidades:', error);
            }
        };

        // Llama a la función asíncrona
        fetchServices();
        fetchLocations();
    }, []);

    const handleLocationChange = (e) => {
        const selected = e.target.value;
        if (selected && !selectedLocation.includes(selected)) {
            const updatedLocations = [...selectedLocation, selected];
            setSelectedLocation(updatedLocations);
            onLocationChange(updatedLocations); // Pasar las localidades a Search
        }
    };

    // 2. Update handleServiceChange to store objects instead of just strings
    const handleServiceChange = (e) => {
        const serviceId = e.target.value;
        const serviceObj = services.find(s => s.idservice === parseInt(serviceId));
        
        if (serviceObj && !selectedServices.find(s => s.idservice === serviceObj.idservice)) {
            const updatedServices = [...selectedServices, serviceObj];
            setSelectedServices(updatedServices);
            onServiceChange(updatedServices);
        }
    };

    // 3. Update the remove function
    const removeService = (serviceToRemove) => {
        const updatedServices = selectedServices.filter(
            service => service.idservice !== serviceToRemove.idservice
        );
        setSelectedServices(updatedServices);
        onServiceChange(updatedServices);
    };

    // Eliminar localidades o servicios seleccionados y actualizar en Search
    const removeLocation = (locationToRemove) => {
        const updatedLocations = selectedLocation.filter(loc => loc !== locationToRemove);
        setSelectedLocation(updatedLocations);
        onLocationChange(updatedLocations); // Actualizar en Search
    };


    return (
        <div className="search-filter">
            <div style={styles.filterContainer}>
                <div style={styles.filterGroup}>

                    {/* ComboBox para Localidades */}
                    <div style={styles.comboBoxContainer}>
                        <label htmlFor="service-combo-box" style={styles.comboBoxLabel}>Localidad:</label>
                        <select
                            id="location-combo-box"
                            style={styles.comboBox}
                            onChange={handleLocationChange}
                            value=""
                        >
                            <option value="" disabled>Elija una localidad</option>
                            {locations.map((location) => (
                                <option key={location.idLocalidad} value={location.nombre}>
                                    {location.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* ComboBox para Servicios */}
                    <div style={styles.comboBoxContainer}>
                        <label htmlFor="service-combo-box" style={styles.comboBoxLabel}>Servicio:</label>
                        <select
                                        id="service-combo-box"
                                        style={styles.comboBox}
                                        onChange={handleServiceChange}
                                        value=""
                                    >
                                        <option value="" disabled>Elija un servicio</option>
                                        {services.map((service) => (
                                            <option key={service.idservice} value={service.idservice}>
                                                {service.description}
                                            </option>
                                        ))}
                        </select>
                    </div>
                    {/* Slider de estrellas */}
                    <div style={styles.sliderGroup}>
                        <h5 style={styles.sliderTitle}>Promedio estrellas: {stars}</h5>
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
                    
                </div>
                <div style={styles.selectedTagsContainer}>
                        {selectedLocation.map((location, index) => (
                            <div key={index} style={styles.tag}>
                                {location}
                                <span
                                    style={styles.removeTag}
                                    onClick={() => removeLocation(location)}
                                >
                                    &#x2715; {/* "X" para eliminar */}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Mostrar servicios seleccionados como etiquetas */}
                    <div style={styles.selectedTagsContainer}>
                        {selectedServices.map((service) => (
                            <div key={service.idservice} style={styles.tag}>
                                {service.description}
                                <span
                                    style={styles.removeTag}
                                    onClick={() => removeService(service)}
                                >
                                    &#x2715;
                                </span>
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    );
};

export default Filter;
