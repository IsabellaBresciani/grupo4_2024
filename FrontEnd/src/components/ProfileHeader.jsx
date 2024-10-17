import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        imagen: '',
        localidad: '',
        telefono: ''
    });

    const getData = async () => {
        try {
            const userD = await axios.get(`http://localhost:4444/api/user/jonyortega`);
            setUserData(userD.data);
        } catch (err) {
            setError('Error al obtener los datos del usuario');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
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
        window.location.reload();

        try {
            const dataUpdated = {
                ...(newData.nombre && { nombre: newData.nombre }),
                ...(newData.apellido && { apellido: newData.apellido }),
                ...(newData.imagen && { imagen: newData.imagen }),
                ...(newData.localidad && { localidad: newData.localidad }),
                ...(newData.telefono && { telefono: newData.telefono })
            };
            if (Object.keys(dataUpdated).length > 0) {
                await axios.put('http://localhost:4444/api/user/jonyortega', dataUpdated);
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
                imagen: userData.imagen || '',
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
                    <div style={styles.editIcon}>
                        <button className="fas fa-edit" onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#333' }}></button>
                    </div>
                    {isModalOpen && (
                        <div className="modal">
                            <div style={styles.modalContent}>
                                <h3>Modificar datos personales</h3>
                                <form>
                                    <div>
                                        <label htmlFor="nombre">Nombre</label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            value={newData.nombre}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="apellido">Apellido</label>
                                        <input
                                            type="text"
                                            id="apellido"
                                            name="apellido"
                                            value={newData.apellido}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="imagen">Imagen (URL)</label>
                                        <input
                                            type="text"
                                            id="imagen"
                                            name="imagen"
                                            value={newData.imagen}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="localidad">Localidad</label>
                                        <input
                                            type="text"
                                            id="localidad"
                                            name="localidad"
                                            value={newData.localidad}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="telefono">Teléfono</label>
                                        <input
                                            type="text"
                                            id="telefono"
                                            name="telefono"
                                            value={newData.telefono}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="button" onClick={modifyData}>Modificar datos</button>
                                    <button type="button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
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
                <p style={styles.profileDescriptionText}>
                    Ingrese una breve descripción.
                </p>
                <div style={styles.editDescriptionIcon}>
                    <i className="fas fa-edit"></i>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;