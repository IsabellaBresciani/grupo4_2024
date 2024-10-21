import React, { useState, useEffect } from 'react';
import LayoutInside from '../../components/LayoutInside';  
import ProfileCard from '../../components/ProfileCard';
import Filter from '../../components/Filter';  
import axios from 'axios';

const styles = {
    container: {
        display: 'flex',            
        flexDirection: 'row',       
        justifyContent: 'space-between',
        padding: '20px',
        alignItems: 'flex-start',   
    },
    profilesContainer: {
        flex: '1',                  
        margin: '20px',             
        padding: '10px',
    },
    filter: {
        marginLeft: '20px',         
        border: '2px solid #ff8000',
        padding: '20px',
        width: '300px',             
        textAlign: 'left',          
        flexShrink: '0',            
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',        
    },
    searchBarContainer: {
        display: 'inline-flex',          
        justifyContent: 'space-between', 
        alignItems: 'center',            
        border: '1px solid #ccc',        
        padding: '10px',                 
        borderRadius: '4px',             
        width: '80%',                    
        margin: '20px auto',             
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
    const [searchTerm, setSearchTerm] = useState('');
    const [userData, setUserData] = useState([]); 
    const [filteredUsers, setFilteredUsers] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmedSearch, setConfirmedSearch] = useState(false); // Estado para confirmar búsqueda

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:4444/api/user`);
                setUserData(response.data);
                setFilteredUsers(response.data); // Inicializa el estado filtrado con todos los usuarios
                setError(null);
            } catch (err) {
                setError('Error al obtener los datos del usuario');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    const handleSearch = () => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filteredData = userData.filter(user => 
            user.usuario.toLowerCase().startsWith(lowercasedFilter) 
        );
        setFilteredUsers(filteredData);
        setConfirmedSearch(true); // Confirma que se realizó la búsqueda
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        if (!e.target.value) {
            setFilteredUsers(userData); // Muestra todos los usuarios si el campo está vacío
            setConfirmedSearch(false); // Resetea la confirmación de búsqueda
        }
    };

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <LayoutInside>  
            <div>
                <p>Cantidad de perfiles existentes: {filteredUsers.length}</p>
                <p>Ingrese el nombre de usuario para buscar perfiles:</p>
                <div style={styles.searchBarContainer}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Buscar perfiles por nombre de usuario..."
                        style={styles.searchBar}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                    <button 
                        style={styles.buttonStyle}
                        onClick={handleSearch}
                    >
                        Buscar
                    </button>
                </div>

                <div style={styles.container}>
                    {/* Contenedor de perfiles */}
                    <div style={styles.profilesContainer}>
                        {confirmedSearch && filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <ProfileCard 
                                    key={user.id} 
                                    name={`${user.nombre} ${user.apellido}`} 
                                    email={user.email} 
                                    phone={user.telefono} 
                                    img={user.foto} 
                                />
                            ))
                        ) : (
                            searchTerm && <p>No se encontraron perfiles.</p>
                        )}
                    </div>

                    {/* Contenedor de filtro */}
                    <div style={styles.filter}>
                        <Filter />
                    </div>
                </div>
            </div>
        </LayoutInside>
    );
};

export default Search;
