/*import React from 'react';
import './ProfileHeader.css'; // Asegúrate de crear este archivo CSS también

const ProfileHeader = () => {
    return (
        <div className="profile-header">
            <h1>Nombre del Usuario</h1>
            <p>Información adicional del usuario.</p>
        </div>
    );
}

export default ProfileHeader;
*/

// src/components/ProfileHeader.jsx
import React from 'react';
import './ProfileHeader.css';

function ProfileHeader() {
  return (
    <div className="profile-header">
      <div className="profile-info">
        <img src="profile_picture.png" alt="Foto de perfil" className="profile-pic" />
        <div>
          <h1>Nombre y Apellido</h1>
          <p>Edad: ---</p>
          <p>Localidad: ---</p>
          <p>Email: ---</p>
          <p>Teléfono: ---</p>
        </div>
      </div>
      <div className="rating">
        <p>Puntuación: ★★★★★</p>
      </div>
    </div>
  );
}

export default ProfileHeader;
