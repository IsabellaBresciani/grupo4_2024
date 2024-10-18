import React, { useState } from 'react';
import LayoutInside from '../../components/LayoutInside';  
import ProfileCard from '../../components/ProfileCard';
import usersData from '../../PruebaSearch.json';
import Filter from '../../components/Filter';  

/*
Cosas que faltan hacer:
-cuando se achica la pantalla el filtro se superpone a las tarjetas de usuario
-que se pueda seleccionar mas de una localidad y que se muestren todas las localidades seleccionadas, deberia tener un boton para quitarlas
*/

const styles = {
    searchBarContainer: {
        display: 'inline-flex',            // Para organizar el input y el botón en una fila
        justifyContent: 'space-between',  // Alinea el input a la izquierda y el botón a la derecha
        alignItems: 'center',       // Alinea verticalmente el contenido
        border: '1px solid #ccc',   // Borde del contenedor
        padding: '10px',            // Espaciado interno del contenedor
        borderRadius: '4px',        // Bordes redondeados
        width: '80%',              // Hace que ocupe el 100% del ancho disponible
        margin: '20px auto',        // Alinea el div en el centro horizontalmente
    },
    
    searchBar: {
        flex: '1',               // Hace que el input ocupe todo el espacio disponible
        textAlign: 'left',       // Alinea el texto dentro del input a la izquierda
        padding: '10px',         // Espaciado interno del input
        marginRight: '10px',     // Separación entre el input y el botón
        fontSize: '16px',        // Tamaño de la fuente del texto
        border: '0px',           // Borde del contenedor
        outline: 'none',         // Elimina el contorno predeterminado
    },
    buttonStyle: {
        padding: '10px 20px',   // Tamaño del botón
        border: 'none',         // Sin borde
        backgroundColor: '#007BFF', // Color de fondo del botón
        color: 'white',         // Color del texto del botón
        borderRadius: '4px',    // Bordes redondeados
        cursor: 'pointer',      // Cambia el cursor a pointer cuando se pase sobre el botón
    },
    
    filter: {
        marginRight: '5vw',
        border: '2px solid #ff8000',
        padding: '20px',
        width: '400px',  // Puedes ajustar el ancho según prefieras
        textAlign: 'left',  // Alineamos el texto a la izquierda
        position: 'fixed',  // Esto lo fija en la parte derecha de la pantalla
        right: '0',  // Se pega al borde derecho
        top: '30%',  // Ajusta la posición vertical
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    },


};

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');   // Valor del input en tiempo real
    const [confirmedSearch, setConfirmedSearch] = useState('');  // Valor confirmado para la búsqueda
    
    // Filtra los usuarios basados en confirmedSearch (cuando se confirma la búsqueda)
    const filteredUsers = usersData.filter(user => 
        user.name.toLowerCase().includes(confirmedSearch.toLowerCase())
    );
    
    // Función para manejar la búsqueda cuando se presiona "Buscar" o Enter
    const handleSearch = () => {
        setConfirmedSearch(searchTerm);  // Actualiza el valor confirmado de búsqueda con lo que hay en el input
    };
    
    return (
        <LayoutInside>
            <div>
                <p>Cantidad de perfiles existentes: {filteredUsers.length}</p>
                <p>Ingrese el nombre para buscar perfiles:</p>
                <div style={styles.searchBarContainer}>
                    <input
                        type="text"
                        value={searchTerm}  // Muestra el valor actual del input
                        onChange={e => setSearchTerm(e.target.value)}  // Actualiza el valor del input en tiempo real
                        placeholder="Buscar perfiles por nombre..."
                        style={styles.searchBar}
                        onKeyDown={(e) => {  // Detecta si se presiona Enter
                            if (e.key === 'Enter') {
                                handleSearch();  // Si es Enter, confirma la búsqueda
                            }
                        }}
                    />
                    <button 
                        style={styles.buttonStyle}
                        onClick={handleSearch}  // Ejecuta la búsqueda al presionar el botón
                    >
                        Buscar
                    </button>
                </div>

                <div>
                    <div>
                        {confirmedSearch && filteredUsers.length > 0 ? (
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
                            searchTerm && <p style={styles.noResults}>No se encontraron perfiles.</p>  // Muestra un mensaje si no se encuentran perfiles
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
