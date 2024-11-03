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
    const [confirmedSearch, setConfirmedSearch] = useState(false); 

    useEffect(() => {
        const getData = async () => {
            setLoading(true); 
        
            try {
                const response = await axios.get(`http://localhost:4444/api/user`);
                setUserData(response.data);
                setFilteredUsers(response.data); // Devuelve todos por defecto
                setError(null);
            } catch (err) {
                setError('Error al obtener los datos del usuario');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    const handleSearch = async () => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filteredByUser = userData.filter(user => 
            user.usuario.toLowerCase().startsWith(lowercasedFilter) 
        );

        if (filteredByUser.length === 0) {
            try {
                const response = await axios.get(`http://localhost:4444/api/user/servicio/${searchTerm}`);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error(error);
                setFilteredUsers([]);
            }
        } else {
            setFilteredUsers(filteredByUser);
        }

        setConfirmedSearch(true); 
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        if (!e.target.value) {
            setFilteredUsers(userData); // Muestra todos los usuarios si el campo está vacío
            setConfirmedSearch(false); 
        }
    };

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <LayoutInside activeItem="search">  
            <div>
                <p>Cantidad de perfiles existentes: {filteredUsers.length}</p>
                <p>Ingrese el nombre de usuario o servicio para buscar perfiles:</p>
                <div style={styles.searchBarContainer}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Buscar perfiles por nombre de usuario o servicio..."
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
                    <div style={styles.profilesContainer}>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <ProfileCard 
                                    usuario={user.usuario} 
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

                    <div style={styles.filter}>
                        <Filter />
                    </div>
                </div>
            </div>
        </LayoutInside>
    );
};

export default Search;