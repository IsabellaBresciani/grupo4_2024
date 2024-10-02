import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ProfileHeader.css';

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
        if (!confirm) {return
        }else{
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
        <div className="profile-header">
            <div className="profile-image">
                <img src={userData.foto} className="fas fa-user-circle" alt="Imagen del perfil" /> 
            </div>
            <div className="profile-info">
                <div className="name-rating-edit"> 
                    <h1>{userData.nombre} {userData.apellido}</h1>
                    <div className="edit-icon">
                        <button className="fas fa-edit" onClick={() => setIsModalOpen(true)}></button>
                    </div>
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
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
                    <div className="profile-rating">
                        <p>Puntuación:</p>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                    </div>
                </div>
                <ul className="profile-details">
                    <li>
                        <i className="fas fa-user"></i> 
                        Edad: {userData.fecha_nacimiento ? formatDate(userData.fecha_nacimiento) : 'Fecha no disponible'}
                    </li>
                    <li><i className="fas fa-map-marker-alt"></i> Localidad: {userData.localidad}</li>
                    <li><i className="fas fa-envelope"></i> Email: {userData.email}</li>
                    <li><i className="fas fa-phone"></i> Teléfono: {userData.telefono}</li>
                </ul>
            </div>
            <div className="profile-description">
                <h3>Descripción:</h3>
                <p>
                    Ingrese una breve descripción.
                </p>
                <div className="edit-description-icon">
                    <i className="fas fa-edit"></i>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
