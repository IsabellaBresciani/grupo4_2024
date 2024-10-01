import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ProfileHeader.css'; // Asegúrate de crear este archivo CSS también

const ProfileHeader = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        try {
            const userD = await axios.get(`http://localhost:4444/api/user/eliri`);
            setUserData(userD.data); // Asegúrate de acceder correctamente al objeto de datos
        } catch (err) {
            setError('Error al obtener los datos del usuario');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Función para formatear la fecha a YYYY/MM/DD
    const formatDate = (fechaISO) => {
        const fecha = new Date(fechaISO);
        const year = fecha.getFullYear();
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Asegura dos dígitos para el mes
        const day = fecha.getDate().toString().padStart(2, '0'); // Asegura dos dígitos para el día
        return `${year}/${month}/${day}`;
    };

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-header">
            {/* Imagen del perfil */}
            <div className="profile-image">
                <i src='' className="fas fa-user-circle">{userData.imagen}</i> {/* Ícono como imagen del perfil */}
            </div>

            {/* Información del perfil */}
            <div className="profile-info">
                <div className="name-rating-edit"> 
                    <h1>{userData.nombre} {userData.apellido}</h1>
                    <div className="edit-icon">
                        <i className="fas fa-edit"></i>
                    </div>
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
                    <li><i className="fas fa-map-marker-alt"></i> Localidad: {userData.data.localidad}</li>
                    <li><i className="fas fa-envelope"></i> Email: {userData.email}</li>
                    <li><i className="fas fa-phone"></i> Teléfono: {userData.telefono}</li>
                </ul>
            </div>

            {/* Descripción debajo */}
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
    