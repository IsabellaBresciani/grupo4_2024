import React from 'react';
import '../css/ProfileHeader.css'; // Asegúrate de crear este archivo CSS también


const ProfileHeader = () => {
    return (
        <div className="profile-header">
            {/* Imagen del perfil */}
            <div className="profile-image">
                <i className="fas fa-user-circle"></i> {/* Ícono como imagen del perfil */}
            </div>

            {/* Información del perfil */}
            <div className="profile-info">
                <div className="name-rating-edit">
                    <h1>Nombre y Apellido</h1>
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
                    <li><i className="fas fa-user"></i> Edad: ---</li>
                    <li><i className="fas fa-map-marker-alt"></i> Localidad: ---</li>
                    <li><i className="fas fa-envelope"></i> Email: ---</li>
                    <li><i className="fas fa-phone"></i> Teléfono: ---</li>
                </ul>
            </div>

            {/* Descripción debajo */}
            <div className="profile-description">
                <h3>Descripción:</h3>
                <p>
                    Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, 
                    or even a very very short story.
                </p>
                <div className="edit-description-icon">
                    <i className="fas fa-edit"></i>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;