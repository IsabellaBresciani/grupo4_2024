
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';  
import ProfileCard from '../components/ProfileCard';
import usersData from '../PruebaSearch.json';
import '../css/Search.css';
import Filter from '../components/Filter';  


    
const Search = () => {
    const [CantEnc, setNumber] = useState(0);
    
    const updateNumber = (newValue) => {
        setNumber(Number(newValue));
    };
  
    const renderComponents = () => {
        let components = [];
        for (let i = 0; i < CantEnc; i++) {
            components.push(<ProfileCard key={i} />); 
        }
        return components;
    };
    
    return (
      <div className='search-page'>

        <Sidebar activeItem="search" /> {/* Set the active item to "search" */}

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
                  {/* Mostrar tarjetas solo si hay un término de búsqueda */}
                  {searchTerm && filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                          <ProfileCard 
                              key={user.id} 
                              name={user.name} 
                              description={user.description} 
                              email={user.email} 
                              phone={user.phone} 
                          />
                      ))
                  ) : (
                      // Mensaje opcional si no hay resultados
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