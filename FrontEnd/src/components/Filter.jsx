import React, { useState, useEffect } from 'react';
import '../css/Filter.css';

const SearchFilter = ({ services, setFilteredServices }) => {
  const [filterOption, setFilterOption] = useState('');
  const [stars, setStars] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const filtered = services.filter((service) => {
      const matchesFilterOption = filterOption ? service.category === filterOption : true;
      const matchesStars = service.stars >= stars;
      const matchesLocation = selectedOption ? service.location === selectedOption : true;

      return matchesFilterOption && matchesStars && matchesLocation;
    });

    setFilteredServices(filtered);
  }, [filterOption, stars, selectedOption, services, setFilteredServices]);

  return (
    <div className="search-filter">
      <div className="filters-container">
        {/* Filtros */}
        <div className="filter-group">
          <div className="combo-box-container">
            <label htmlFor="combo-box" className="combo-box-label">Seleccione una localidad:</label>
            <select
              id="combo-box"
              className="combo-box"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="" disabled>--Elija una opción--</option>
              <option value="La Plata">La Plata</option>
              <option value="Berisso">Berisso</option>
              <option value="Ensenada">Ensenada</option>
            </select>
          </div>

          {/* Slider de estrellas */}
          <div className="slider-group filter-section">
            <h5>Estrellas: {stars}</h5>
            <input
              type="range"
              min="0"
              max="5"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
