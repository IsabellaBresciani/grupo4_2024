import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const styles = {
    profileHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ddd',
        paddingBottom: '10px',
        marginBottom: '20px',
    },
    profileImage: {
        marginRight: '15px',
        borderRadius: '120px',
        maxHeight: '200px',
        maxWidth: '200px',
        height: '300px',
        width: '300px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    modal: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Filtro oscuro detrás del modal
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', /* Sombra para simular tarjeta */
        textAlign: 'Left', /* Contenido a la izquierza */

    },
    modalInput: {
        width: '100%',              // Ancho completo del input
        padding: '10px',            // Espaciado interno
        margin: '10px 0',           // Margen entre inputs
        border: '1px solid #ddd',   // Borde gris claro
        borderRadius: '5px',        // Bordes redondeados
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  // Sombra sutil
        fontSize: '1rem',           // Tamaño de fuente adecuado
        outline: 'none',            // Elimina el borde azul cuando se selecciona
        transition: 'border-color 0.3s ease', // Transición suave para el borde
    },
    modalInputFocus: {
        borderColor: '#FF8C00',     // Cambia el color del borde al hacer focus
    },
    modalLabel: {
        display: 'block',           // Asegura que las etiquetas ocupen su propia línea
        marginBottom: '0px',        // Margen inferior para separar de los inputs
        fontWeight: 'bold',         // Hace que las etiquetas sean más notorias
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',  // Alinea los botones a la derecha
        marginTop: '20px',           // Margen superior para separar de los inputs
    },
    GuardarButton: {
        backgroundColor: '#FF8C00',  // Color de fondo naranja
        color: 'white',              // Color del texto
        padding: '10px 20px',        // Espaciado interno
        border: 'none',              // Sin borde
        borderRadius: '5px',         // Bordes redondeados
        cursor: 'pointer',           // Cambia el cursor al pasar por encima
        marginTop: '10px',           // Margen superior para separarlo de otros elementos
    },
    cancelButton: {
        backgroundColor: '#ccc',    // Color de fondo gris claro
        color: 'black',             // Color del texto
        padding: '10px 20px',       // Espaciado interno
        border: 'none',             // Sin borde
        borderRadius: '5px',        // Bordes redondeados
        cursor: 'pointer',          // Cambia el cursor al pasar por encima
        marginTop: '10px',          // Margen superior para separarlo de otros elementos
        marginLeft: '10px',          // Espacio entre botones
    },
    nameRatingEdit: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '10px',
    },
    profileDetailsHeader: {
        fontSize: '1.8rem',
        marginBottom: '5px',
        color: '#333',
        display: 'inline-block',
    },
    editIcon: {
        marginLeft: '10px',
        fontSize: '1.2rem',
        cursor: 'pointer',
        color: '#333',
        display: 'inline-block',
    },
    profileRating: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '1rem',
        marginLeft: 'auto',
    },
    profileDetails: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        fontSize: '0.9rem',
        marginBottom: '20px',
    },
    profileDetailsItem: {
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        color: '#555',
    },
    profileDescription: {
        width: '100%',
        paddingTop: '10px',
        marginTop: '10px',
        borderTop: '1px solid #ddd',
        fontSize: '0.9rem',
        display: 'flex',
        justifyContent: 'space-between',
    },
    profileDescriptionHeader: {
        marginRight: '10px',
        fontSize: '1rem',
        color: '#333',
    },
    profileDescriptionText: {
        color: '#555',
        marginLeft: '10px',
        flex: 1,
    },
    editDescriptionIcon: {
        fontSize: '1rem',
        cursor: 'pointer',
        alignSelf: 'flex-end',
    },

};

const ProfileHeader = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newData, setNewData] = useState({
        nombre: '',
        apellido: '',
        foto: '',
        localidad: '',
        telefono: ''
    });

    const [editandoDescripcion, setEditandoDescripcion] = useState(false); // estado para editar descripción
    const [descripcion, setDescripcion] = useState("Ingrese una breve descripción."); // estado para la descripción

    const userName = String(localStorage.getItem('usuario'));
    const getData = async () => {
        try {
            const userD = await axios.get(`http://localhost:4444/api/user/${userName}`);
            setUserData(userD.data);
        } catch (err) {
            setError('Error al obtener los datos del usuario');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {

        const { name, value } = e.target;
        console.log(value);
        setNewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const modifyData = async () => {
        const confirm = window.confirm("¿Estás seguro de que deseas modificar tus datos?");
        if (!confirm) {
            return;
        } else {
            setIsModalOpen(false);
        }
        //window.location.reload(); //Refrescaría toda la UI

        try {
            const dataUpdated = {
                ...(newData.nombre && { nombre: newData.nombre }),
                ...(newData.apellido && { apellido: newData.apellido }),
                ...(newData.foto && { foto: newData.foto }),
                ...(newData.localidad && { localidad: newData.localidad }),
                ...(newData.telefono && { telefono: newData.telefono })
            };

            if (Object.keys(dataUpdated).length > 0) {
                await axios.put(`http://localhost:4444/api/user/${userName}`, dataUpdated);
                getData(); // Refresca los datos después de la modificación
            }
        } catch (error) {
            console.error('Error al modificar los datos:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            setNewData({
                nombre: userData.nombre || '',
                apellido: userData.apellido || '',
                foto: userData.foto || '',
                localidad: userData.localidad || '',
                telefono: userData.telefono || ''
            });
        }
        
    }, [userData]);

    const formatDate = (fechaISO) => {
        const fecha = new Date(fechaISO);
        const year = fecha.getFullYear();
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const day = fecha.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    //para la descripcion
    const handleEditDescriptionClick = () => {
        setEditandoDescripcion(true);
    };
    //para la descripcion
    const handleSaveDescription = () => {
        setEditandoDescripcion(false);
    };

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={styles.profileHeader}>
            <div style={styles.profileImage}>
                <img src={userData.foto} alt="Imagen del perfil" style={{ borderRadius: '120px', maxHeight: '200px', maxWidth: '200px' }} />
            </div>
            <div style={styles.profileInfo}>
                <div style={styles.nameRatingEdit}>
                    <h1 style={styles.profileDetailsHeader}>{userData.nombre} {userData.apellido}</h1>
                    <button style={styles.editIcon} onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>

                    {isModalOpen && (
                        <div style={styles.modal}>
                            <div style={styles.modalContent}>
                                <h3>Modificar datos personales</h3>
                                <form>
                                    <div>
                                        <label htmlFor="nombre" style={styles.modalLabel}>Nombre</label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            value={newData.nombre}
                                            onChange={handleChange}
                                            style={styles.modalInput}
                                            onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
                                            onBlur={(e) => (e.target.style.borderColor = '#ddd')} // Vuelve al color original cuando se pierde el foco

                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="apellido" style={styles.modalLabel}>Apellido</label>
                                        <input
                                            type="text"
                                            id="apellido"
                                            name="apellido"
                                            value={newData.apellido}
                                            onChange={handleChange}
                                            style={styles.modalInput}
                                            onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
                                            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="foto" style={styles.modalLabel}>Imagen (URL)</label>
                                        <input
                                            type="text"
                                            id="foto"
                                            name="foto"
                                            value={newData.foto}
                                            onChange={handleChange}
                                            style={styles.modalInput}
                                            onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
                                            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="localidad" style={styles.modalLabel}>Localidad</label>
                                        <input
                                            type="text"
                                            id="localidad"
                                            name="localidad"
                                            value={newData.localidad}
                                            onChange={handleChange}
                                            style={styles.modalInput}
                                            onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
                                            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="telefono" style={styles.modalLabel}>Teléfono</label>
                                        <input
                                            type="text"
                                            id="telefono"
                                            name="telefono"
                                            value={newData.telefono}
                                            onChange={handleChange}
                                            style={styles.modalInput}
                                            onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
                                            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                                        />
                                    </div>
                                    {/* Contenedor de botones */}
                                    <div style={styles.buttonsContainer}>
                                        <button
                                            type="button"
                                            onClick={modifyData}
                                            style={styles.GuardarButton}
                                        >
                                            Guardar cambios
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            style={styles.cancelButton}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    <div style={styles.profileRating}>
                        <p>Puntuación:</p>
                        <div className="stars">
                            <i className="fas fa-star" style={{ color: '#FFD700', marginRight: '3px' }}></i>
                            <i className="fas fa-star" style={{ color: '#FFD700', marginRight: '3px' }}></i>
                            <i className="fas fa-star" style={{ color: '#FFD700', marginRight: '3px' }}></i>
                            <i className="fas fa-star" style={{ color: '#FFD700', marginRight: '3px' }}></i>
                            <i className="fas fa-star-half-alt" style={{ color: '#FFD700', marginRight: '3px' }}></i>
                        </div>
                    </div>
                </div>
                <ul style={styles.profileDetails}>
                    <li style={styles.profileDetailsItem}>
                        <i className="fas fa-user"></i>
                        Edad: {userData.fecha_nacimiento ? formatDate(userData.fecha_nacimiento) : 'Fecha no disponible'}
                    </li>
                    <li style={styles.profileDetailsItem}><i className="fas fa-map-marker-alt"></i> Localidad: {userData.localidad}</li>
                    <li style={styles.profileDetailsItem}><i className="fas fa-envelope"></i> Email: {userData.email}</li>
                    <li style={styles.profileDetailsItem}><i className="fas fa-phone"></i> Teléfono: {userData.telefono}</li>
                </ul>
            </div>
            <div style={styles.profileDescription}>
                <h3 style={styles.profileDescriptionHeader}>Descripción:</h3>
                {editandoDescripcion ? (
                    <div style={{ flex: 1 }}>
                        <textarea 
                            value={descripcion} 
                            onChange={(e) => setDescripcion(e.target.value)} 
                            placeholder="Ingrese una breve descripción"
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                        />
                        <button onClick={handleSaveDescription} style={styles.GuardarButton}>
                            Guardar
                        </button>
                    </div>
                ) : (
                    <p style={styles.profileDescriptionText}>
                        {descripcion}
                    </p>
                )}
                {!editandoDescripcion && (
                    <div style={styles.editDescriptionIcon} onClick={handleEditDescriptionClick}>
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileHeader;