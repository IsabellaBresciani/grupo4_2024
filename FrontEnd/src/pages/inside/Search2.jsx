import React, { useState, useEffect } from 'react';
import LayoutInside from '../../components/LayoutInside';
import LayoutOutside from '../../components/LayoutOutside';
import ProfileCard from '../../components/ProfileCard';
import Filter from '../../components/Filter';
import axios from 'axios';

const styles = {
    searchContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: "2vh",
        
    },
    container: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
  
        padding: '20px',
        alignItems: 'center',
    },
    profilesContainer: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1',
        margin: '20px',
        padding: '10px',
    },
    filter: {
   
    
        padding: '20px',
        width: '80vw',
        textAlign: 'left',
        flexShrink: '0',
       
    },
    searchBarContainer: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px',
        width: '80vw',
        margin: '20px auto',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
    },
    searchBar: {
        flex: '1',
        textAlign: 'left',
        padding: '10px',
        marginRight: '10px',
        fontSize: '16px',
        border: '0px',
        outline: 'none',
    },
    buttonStyle: {
        padding: '10px 20px',
        border: 'none',
        backgroundColor: '#ff8000',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
    },
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

const Search2 = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, []);
    const [searchTerm, setSearchTerm] = useState('');
  
    const [userData, setUserData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
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
                console.log(location.data)
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
            setFilteredLocations(updatedLocations); // Pasar las localidades a Search
        }
    };

    // 2. Update handleServiceChange to store objects instead of just strings
    const handleServiceChange = (e) => {
        const serviceId = e.target.value;
        const serviceObj = services.find(s => s.idservice === parseInt(serviceId));
        if (serviceObj && !selectedServices.find(s => s.idservice === serviceObj.idservice)) {
            const updatedServices = [...selectedServices, serviceObj];
            setSelectedServices(updatedServices);
            setFilteredServices(updatedServices)
        }
    };

    // 3. Update the remove function
    const removeService = (serviceToRemove) => {
        const updatedServices = selectedServices.filter(
            service => service.idservice !== serviceToRemove.idservice
        );
        setSelectedServices(updatedServices);
        setFilteredServices(updatedServices);
    };

    // Eliminar localidades o servicios seleccionados y actualizar en Search
    const removeLocation = (locationToRemove) => {
        const updatedLocations = selectedLocation.filter(loc => loc !== locationToRemove);
        setSelectedLocation(updatedLocations);
        setFilteredLocations(updatedLocations); // Actualizar en Search
    };
    useEffect(() => {
        // In Search.js - Add better error handling
        const getData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4444/api/user`);
                console.log('User Response:', response.data);  // Debug log

                const usersWithDetails = await Promise.all(
                    response.data.map(async (user) => {
                        try {
                            // Debug logs
                            const serviceResponse = await axios.get(`http://localhost:4444/api/user/${user.usuario}/servicios`);
                            console.log(`Services for ${user.usuario}:`, serviceResponse.data);

                            const locationResponse = await axios.get(`http://localhost:4444/api/localidad/usuario/${user.usuario}`);
                            console.log(`Locations for ${user.usuario}:`, locationResponse.data);

                            return {
                                ...user,
                                services: serviceResponse.data,
                                localidades: locationResponse.data.map(loc => loc.nombre)
                            };
                        } catch (err) {
                            console.error(`Error fetching details for ${user.usuario}:`, err);
                            return null;
                        }
                    })
                );

                setUserData(usersWithDetails.filter(Boolean));
            } catch (err) {
                console.error('Error fetching users:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            const lowercasedFilter = searchTerm.toLowerCase();
            const usersFiltered = userData.filter(user => {
                const matchesName = user.usuario.toLowerCase().includes(lowercasedFilter);

                // Filtrar por localidades: verificar si alguna localidad coincide
                const matchesLocation = filteredLocations.length === 0 || user.localidades.some(loc => filteredLocations.includes(loc));

                // Filtrar por servicios
                console.log("FILTERSSSSSSSSS")
                console.log(filteredServices)
                const matchesService = filteredServices.length === 0 || user.services.some(userService => 
                    filteredServices.some(filteredService => filteredService.description === userService.description)
                );
                console.log(`Usuario: ${user.usuario}`);
                console.log(`  Coincide con nombre: ${matchesName}`);
                console.log(`  Coincide con localidades: ${matchesLocation}`);
                console.log(`  Coincide con servicios: ${matchesService}`);
                
                return matchesName && matchesLocation && matchesService;
            });

            console.log("Usuarios filtrados:", usersFiltered);
            setFilteredUsers(usersFiltered);
        };
        applyFilters();
    }, [searchTerm, filteredLocations, filteredServices, userData]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const LayoutWrapper = ({ isAuthenticated, children }) => {
        const Layout = isAuthenticated ? LayoutInside : LayoutOutside;
        return <Layout activeItem="search">{children}</Layout>;
      };


    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>{error}</p>;

    return (

         <LayoutWrapper isAuthenticated={isAuthenticated}>
       
            <div  style={styles.searchContainer}>
               
     
                <div style={styles.searchBarContainer}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        
                        placeholder="Buscar perfiles por nombre de usuario o servicio..."
                        style={styles.searchBar}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleChange(e.target.value);
                            }
                        }}
                    />
                    <button
                        style={styles.buttonStyle}
                        onClick={() => setSearchTerm(searchTerm)}
                    >
                        Buscar
                    </button>
                </div>
                <div style={styles.filter}>
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
                </div>
                <div style={styles.container}>
                    
                    <div style={styles.profilesContainer}>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <ProfileCard
                                    key={user.usuario}
                                    usuario={user.usuario}
                                    name={`${user.nombre} ${user.apellido}`}
                                    email={user.email}
                                    description={user.descripcion || "No hay descripcion"}
                                    phone={user.telefono}
                                    img={user.foto}
                                    location={user.localidades.join(', ')} // Muestra todas las localidades
                                />
                            ))
                        ) : (
                            searchTerm && <p>No se encontraron perfiles.</p>
                        )}
                    </div>

                    
                </div>
            </div>
        
        </LayoutWrapper>
    );
};

export default Search2;
