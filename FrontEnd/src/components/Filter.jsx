import React, { useState } from 'react';

const styles = {
    filterGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
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
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        width: '100%',
    },
    comboBoxHover: {
        borderColor: '#888',
    },
    sliderGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    sliderTitle: {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '0',
    },
    sliderInput: {
        maxWidth: '60%',
    },
};

const Filter = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [stars, setStars] = useState(0);

    return (
        <div className="search-filter">
            <div className="filters-container">
                <div style={styles.filterGroup}>
                    {/* ComboBox for Localidad */}
                    <div style={styles.comboBoxContainer}>
                        <label htmlFor="combo-box" style={styles.comboBoxLabel}>Seleccione una localidad:</label>
                        <select 
                            id="combo-box" 
                            style={styles.comboBox}
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
                    <div style={styles.sliderGroup}>
                        <h5 style={styles.sliderTitle}>Estrellas: {stars}</h5>
                        <input
                            style={styles.sliderInput}
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

export default Filter;