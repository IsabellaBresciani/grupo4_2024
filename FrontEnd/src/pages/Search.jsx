import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';  
import ProfileCard from '../components/ProfileCard';
import usersData from '../PruebaSearch.json';
import '../css/Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
      // Filtrar los usuarios basado en el nombre
      const results = usersData.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(results);
  }, [searchTerm]);

  return (
      <div className='search-page'>
          <Sidebar />  
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
          </div>
      </div>
  );
};

export default Search;