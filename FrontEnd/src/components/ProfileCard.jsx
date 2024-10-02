import React from 'react';
import '../css/ProfileCard.css'; 

function ProfileCard() {
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
        <h3>Jardinero01</h3>
        <p>Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
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