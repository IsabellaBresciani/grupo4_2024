import React from 'react';
import '../css/ProfileCard.css'; 

function ProfileCard({ name, description, email, phone }) {
  return (
    <div className="profile-card">
      {/* Imagen del perfil */}
      <img 
        src="../../public/logo192.png" 
        alt="Foto de perfil" 
        className="profile-image" 
      />
      
      {/* Contenedor del texto */}
      <div className="profile-details">
        <h3>{name}</h3>
        <p>{description}</p>
        
        {/* Datos de contacto */}
        <p>Email: {email}</p>
        <p>Teléfono: {phone}</p>

        {/* Calificación con estrellas */}
        <div className="profile-rating">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;