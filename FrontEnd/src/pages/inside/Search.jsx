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
};

const Search = () => {
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
                const matchesService = filteredServices.length === 0 || user.services.some(service => filteredServices.includes(service.description));

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

    const handleLocationChange = (locations) => {
        console.log("Localidades seleccionadas para el filtro:", locations);
        setFilteredLocations(locations);
    };

    const LayoutWrapper = ({ isAuthenticated, children }) => {
        const Layout = isAuthenticated ? LayoutInside : LayoutOutside;
        return <Layout activeItem="search">{children}</Layout>;
      };

    const handleServiceChange = (services) => setFilteredServices(services);

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
                                setSearchTerm(e.target.value);
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
                        <Filter onLocationChange={handleLocationChange} onServiceChange={handleServiceChange} />
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

export default Search;
