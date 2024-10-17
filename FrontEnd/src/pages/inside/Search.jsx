import React, { useState } from 'react';
import LayoutInside from '../../components/LayoutInside';  
import ProfileCard from '../../components/ProfileCard';
import usersData from '../../PruebaSearch.json';
import Filter from '../../components/Filter';  

const styles = {
    searchPage: {
        marginLeft: '5vw',
        padding: '20px',
        flexGrow: 1,
        backgroundColor: '#f9f9f9',
        overflowY: 'auto',
    },
    searchLayout: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
    },
    filterContainer: {
        width: '250px',
        marginRight: '20px',
    },
    searchContent: {
        flexGrow: 1,
    },
    searchInput: {
        width: '100%',
    },
    profileCards: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
    },
    noResults: {
        textAlign: 'center',
        color: '#666',
        fontSize: '18px',
    },
};

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Filter users based on searchTerm
    const filteredUsers = usersData.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <LayoutInside>  
            <div style={styles.searchPage}>
                <div style={styles.searchContent}>
                    <p>Cantidad de perfiles existentes: {filteredUsers.length}</p>
                    <p>Ingrese el nombre para buscar perfiles:</p>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Buscar perfiles por nombre..."
                        style={styles.searchInput}
                    />   
                    <div style={styles.profileCards}>
                        {searchTerm && filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <ProfileCard 
                                    key={user.id} 
                                    name={user.name} 
                                    description={user.description} 
                                    email={user.email} 
                                    phone={user.phone} 
                                    img={user.img} 
                                />
                            ))
                        ) : (
                            searchTerm && <p style={styles.noResults}>No se encontraron perfiles.</p>
                        )}
                    </div>
                    <div style={styles.filterContainer}>
                        <Filter />
                    </div>
                </div>
            </div>
        </LayoutInside>
    );
};

export default Search;