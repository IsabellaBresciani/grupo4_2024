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

import React from 'react';

const ProfileHeader = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ borderRadius: '50%', width: '100px', height: '100px', backgroundColor: '#ccc' }} />
            <h1>Nombre y Apellido</h1>
            <p>Edad: ---</p>
            <p>Localidad: ---</p>
            <p>Email: ---</p>
            <p>Teléfono: ---</p>
            <p>Puntuación: ★★★★☆</p>
            <p>Descripción: Lorem ipsum dolor sit amet...</p>
        </div>
    );
};

export default ProfileHeader;

