import React from 'react';

const styles = {
    popupOverlay: {
    	position: 'fixed',
    	top: 0,
    	left: 0,
    	width: '100%',
    	height: '100%',
    	backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
    	display: 'flex',
    	justifyContent: 'center',
   		alignItems: 'center',
    	zIndex: 1000, // Asegúrate de que esté encima de todo
  	},
  
  	popupContent: {
    	backgroundColor: 'white',
    	marginTop: '30px',
	    padding: '20px',
	    borderRadius: '10px',
	    width: '70%',
	    height: '80%',
	    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
 	   	position: 'relative',
  	},
    
  	closeButton: {
    	position: 'absolute',
    	top: '10px',
    	right: '10px',
    	backgroundColor: 'transparent',
    	border: 'none',
    	fontSize: '16px',
    	cursor: 'pointer',
    	outline: 'none',
  	},
}

const NewReviewPopup = ({ show, onClose }) => {
    // Si no debe mostrarse, no renderizamos nada
      if (!show) {
          return null;
      }

      return (
        <div style={styles.popupOverlay} onClick={onClose}>
          <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={onClose}>X</button>
            <h2>Crear nueva reseña</h2>
    
            <p>Formulario re copado de reseña</p>
    
          </div>
        </div>
      );
    };

export default NewReviewPopup;