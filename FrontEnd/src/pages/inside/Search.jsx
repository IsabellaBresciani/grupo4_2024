import React, { useState } from 'react';
import LayoutInside from '../../components/LayoutInside';  
import ProfileCard from '../../components/ProfileCard';
import usersData from '../../PruebaSearch.json';
import Filter from '../../components/Filter';  
import { MdBorderColor } from 'react-icons/md';

/*
Cosas que faltan hacer:
-cuando se achica la pantalla el filtro se superpone a las tarjetas de usuario
-que se pueda seleccionar mas de una localidad y que se muestren todas las localidades seleccionadas, deberia tener un boton para quitarlas
*/

const styles = {
    container: {
        display: 'flex',            // Flexbox para dividir en dos columnas
        flexDirection: 'row',       // Organiza los hijos en una fila
        justifyContent: 'space-between',
        padding: '20px',
        alignItems: 'flex-start',   // Asegura que los elementos se alineen al inicio del eje vertical
    },
    profilesContainer: {
        flex: '1',                  // Toma el 70% del ancho
        marginTop: '-20px',       
        marginLeft:  '-20px',
        marginRight:  '20px',
        border: '2px solid #ff8000',
    },
    filter: {
        marginRight: '5vw',         //Establece un margen a la derecha del contenedor.
        border: '2px solid #ff8000',//Define el borde del contenedor del filtro. 
        padding: '20px',
        width: '300px',             // Fija un ancho al filtro
        textAlign: 'left',          // Alineamos el texto a la izquierda
        flexShrink: '0',            // Evita que el filtro se encoja
        right: '0',                 // Se pega al borde derecho
        top: '30%',                 // Ajusta la posición vertical
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky',         //Permite que el filter siga al scrollbar.
        flexDirection: 'column',
        boxSizing: 'border-box',    // Incluye borde y padding en el tamaño total
        height: 'auto',             // Ajusta la altura al contenido
        alignSelf: 'flex-start',    // Alinea el filtro al principio del contenedor
        borderRadius: '4px',        // Bordes redondeados
    },
    searchBarContainer: {
        display: 'inline-flex',          // Para organizar el input y el botón en una fila
        justifyContent: 'space-between', // Alinea el input a la izquierda y el botón a la derecha
        alignItems: 'center',            // Alinea verticalmente el contenido
        border: '1px solid #ccc',        // Borde del contenedor
        padding: '10px',                 // Espaciado interno del contenedor
        borderRadius: '4px',             // Bordes redondeados
        width: '80%',                    // Hace que ocupe el 100% del ancho disponible
        margin: '20px auto',             // Alinea el div en el centro horizontalmente
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
        padding: '10px 20px',       // Tamaño del botón
        border: 'none',             // Sin borde
        backgroundColor: '#007BFF', // Color de fondo del botón
        color: 'white',             // Color del texto del botón
        borderRadius: '4px',        // Bordes redondeados
        cursor: 'pointer',          // Cambia el cursor a pointer cuando se pase sobre el botón
    },
};

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmedSearch, setConfirmedSearch] = useState('');
    
    const filteredUsers = usersData.filter(user => 
        user.name.toLowerCase().includes(confirmedSearch.toLowerCase())
    );

    const handleSearch = () => {
        setConfirmedSearch(searchTerm);
    };

    return (
        <LayoutInside>
            <div>
                <p>Cantidad de perfiles existentes: {filteredUsers.length}</p>
                <p>Ingrese el nombre para buscar perfiles:</p>
                <div style={styles.searchBarContainer}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Buscar perfiles por nombre..."
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
