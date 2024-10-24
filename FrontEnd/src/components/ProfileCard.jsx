import React from 'react';

const styles = {
    profileCard: {
        display: 'flex',
        alignItems: 'center',
        border: '2px solid rgba(255, 135, 16, 0.8)',
        borderRadius: '10px',
        padding: '10px',
        maxWidth: '1000px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        margin: '20px 0',  // Space around each card 
    },
    profileImage: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: '20px',
    },
    profileDetails: {
        flexGrow: 1,
        overflow: 'hidden',  // Para evitar desbordes en textos largos
    },
    profileDetailsHeader: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 'bold',
    },
    profileDetailsText: {
        margin: '5px 0',
        color: '#555',
        fontSize: '14px',
    },
    profileRating: {
        display: 'flex',
        gap: '5px',
        fontSize: '20px',
        color: '#ffc107', // Star color
    },
    contactInfo: {
      marginTop: '10px', // Espacio entre la descripción y la información de contacto
    },
};

function ProfileCard({ name, description, email, phone, img }) {
  return (
    <div style={styles.profileCard}>
      {/* Profile image */}
      <img 
        src={img}
        alt="Profile" 
        style={styles.profileImage} 
      />
      
      {/* Text container */}
      <div style={styles.profileDetails}>
        <h3 style={styles.profileDetailsHeader}>{name}</h3>
        <p style={styles.profileDetailsText}>{description}</p>
        
        {/* Contact information */}
        <div style={styles.contactInfo}>
        <p style={styles.profileDetailsText}>Email: {email}</p>
        <p style={styles.profileDetailsText}>Teléfono: {phone}</p>
        </div>

        {/* Rating with stars */}
        <div style={styles.profileRating}>
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