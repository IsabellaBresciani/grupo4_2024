import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';  
import ProfileCard from '../components/ProfileCard';
import usersData from '../PruebaSearch.json';
import '../css/Search.css';
import Filter from '../components/Filter';  

const Search = () => {
    const [CantEnc, setNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    
    const updateNumber = (newValue) => {
        setNumber(Number(newValue));
    };
  
    // Filter users based on searchTerm
    const filteredUsers = usersData.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderComponents = () => {
        let components = [];
        for (let i = 0; i < CantEnc; i++) {
            components.push(<ProfileCard key={i} />); 
        }
        return components;
    };
    
    return (
      <div className='search-page'>
        <Sidebar activeItem="search" />
        <div className='search-content'>
            <p>Cantidad de perfiles existentes: {filteredUsers.length}</p>
            <p>Ingrese el nombre para buscar perfiles:</p>
            <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar perfiles por nombre..."
            />   
            <div className='profile-cards'>
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
                    searchTerm && <p>No se encontraron perfiles.</p>
                )}
            </div>
            <div className='filter-container'>
                <Filter />
            </div>
        </div>
      </div>
    );
};

export default Search;