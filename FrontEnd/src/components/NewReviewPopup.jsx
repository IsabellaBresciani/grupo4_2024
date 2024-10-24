import React, { useState } from 'react';
import axios from 'axios';

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
    overflowY: 'auto', // Habilitar scroll si el contenido es más alto que el pop-up
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

  ratingBarsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px', // menos espacio entre elementos
  },

  ratingBar: {
    height: '10px',
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden',
    position: 'relative',
  },

  filledBar: {
    height: '100%',
    backgroundColor: '#ffc107',
    borderRadius: 'inherit',
    transition: 'width 0.3s ease',
  },

  detailLabelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
  },

  title: {
    fontWeight: '500',
    margin: '0',
    paddingBottom: '2px',
  },

  textarea: {
    width: '100%',
    height: '150px', // Altura grande para descripciones largas
    padding: '10px',
    fontSize: '16px', // Tamaño de fuente cómodo para leer
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    outline: 'none',
    resize: 'vertical', // Permite cambiar el tamaño solo en altura
    marginTop: '20px',  // Añadido espacio antes del textarea
  },
};

const NewReviewPopup = ({ show, onClose }) => {
	const [reviewData, setReviewData] = useState({
	  precio: 0,
	  calidad: 0,
	  atencion: 0,
	  tiempo: 0,
	  comentario: '',
	  idAutor: '',
	  servicioasociado_id: '',
	});
  
	if (!show) {
	  return null;
	}
  
	// Función para manejar cambios en los inputs
	const handleInputChange = (e) => {
	  const { name, value } = e.target;
	  setReviewData((prevData) => ({
		...prevData,
		[name]: value,
	  }));
	};
  
	// Función para enviar la reseña a la API
	const handleSubmit = async () => {
	  try {
		const response = await axios.post('http://localhost:4444/api/review', reviewData);
		console.log('Reseña creada:', response.data);
		// Aquí puedes cerrar el popup o resetear el estado
		onClose();
	  } catch (error) {
		console.error('Error al crear la reseña:', error);
	  }
	};
  
	return (
	  <div style={styles.popupOverlay} onClick={onClose}>
		<div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
		  <button style={styles.closeButton} onClick={onClose}>X</button>
		  <h2>Crear nueva reseña</h2>
  
		  <div style={styles.ratingBarsContainer}>
			<p style={styles.title}>Precio</p>
			<input
			  style={styles.ratingBar}
			  type="range"
			  min="0"
			  max="5"
			  name="precio"
			  value={reviewData.precio}
			  onChange={handleInputChange}
			/>
			<div style={styles.detailLabelContainer}>
			  <p>Malo</p>
			  <p>Excelente</p>
			</div>
  
			<p style={styles.title}>Calidad</p>
			<input
			  style={styles.ratingBar}
			  type="range"
			  min="0"
			  max="5"
			  name="calidad"
			  value={reviewData.calidad}
			  onChange={handleInputChange}
			/>
			<div style={styles.detailLabelContainer}>
			  <p>Malo</p>
			  <p>Excelente</p>
			</div>
  
			<p style={styles.title}>Atención</p>
			<input
			  style={styles.ratingBar}
			  type="range"
			  min="0"
			  max="5"
			  name="atencion"
			  value={reviewData.atencion}
			  onChange={handleInputChange}
			/>
			<div style={styles.detailLabelContainer}>
			  <p>Malo</p>
			  <p>Excelente</p>
			</div>
  
			<p style={styles.title}>Tiempo</p>
			<input
			  style={styles.ratingBar}
			  type="range"
			  min="0"
			  max="5"
			  name="tiempo"
			  value={reviewData.tiempo}
			  onChange={handleInputChange}
			/>
			<div style={styles.detailLabelContainer}>
			  <p>Malo</p>
			  <p>Excelente</p>
			</div>
		  </div>
  
		  {/* Campo para el comentario */}
		  <p style={styles.title}>Descripción:</p>
		  <textarea
			name="comentario"
			value={reviewData.comentario}
			onChange={handleInputChange}
			style={styles.textarea}
			placeholder="Escribe una descripción..."
		  />
  
		  {/* Botón para enviar la reseña */}
		  <div>
			<button onClick={handleSubmit}>Enviar Reseña</button>
		  </div>
		</div>
	  </div>
	);
  };

export default NewReviewPopup;
