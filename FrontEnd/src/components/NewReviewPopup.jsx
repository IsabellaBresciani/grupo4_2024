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
  	marginTop: '10px',
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

	columnsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: '20px', // Espacio entre las dos columnas
    alignItems: 'flex-start', 
    height: '100%',
    marginTop: '40px',
  },

  ratingBarsColumn: {
		width: '50%',  
	  display: 'flex',
	  flexDirection: 'column',
	  justifyContent: 'center',
	  gap: '5px',
    marginTop: '40px',
    marginLeft: '20px',
  },

  ratingBar: {
  	height: '10px',
  	width: '100%',
  	backgroundColor: '#e0e0e0',
  	borderRadius: '5px',
  	overflow: 'hidden',
  	position: 'relative',
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

  descriptionColumn: {
    width: '50%',  // Ocupar la mitad del ancho disponible
    marginTop: '40px',
    marginRight: '20px',
  },

  textarea: {
  	width: '100%',
  	height: '300px', // Altura grande para descripciones largas
  	padding: '10px',
  	fontSize: '16px', // Tamaño de fuente cómodo para leer
  	borderRadius: '8px',
  	border: '1px solid #ccc',
  	boxSizing: 'border-box',
  	outline: 'none',
  	resize: 'vertical', // Permite cambiar el tamaño solo en altura
  },

  verticalBar: {
    width: '3px',
    height: '80%',  
    backgroundColor: '#ff8000',
    marginLeft: '10px',  
    marginRight: '10px',
  },

  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end', 
    gap: '10px', 
    padding: '5px',
    marginTop: '10px', 
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#ff7f11',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    minWidth: '100px', 
    height: '40px', 
  },
};

const NewReviewPopup = ({ show, onClose, asociacionId }) => {
    const [reviewData, setReviewData] = useState({
        precio: 0,
        calidad: 0,
        atencion: 0,
        tiempo: 0,
        comentario: '',
        idAutor: 17, // Aquí deberías obtener el idAutor del contexto del usuario o similar
        servicioasociado_id: asociacionId,
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
            // Verifica que todos los campos están correctamente llenos
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
                <div style={styles.columnsContainer}>
                    <div style={styles.ratingBarsColumn}>
                        {/* Barra para puntuar el precio */}
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

                        {/* Barra para puntuar la calidad del trabajo */}
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
                            <p>Pesima</p>
                            <p>Admirable</p>
                        </div>

                        {/* Barra para puntuar la atención al cliente */}
                        <p style={styles.title}>Atención al cliente</p>
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
                            <p>Antisocial</p>
                            <p>Muy atento</p>
                        </div>

                        {/* Barra para puntuar el tiempo */}
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
                            <p>Muy lento</p>
                            <p>Muy veloz</p>
                        </div>
                    </div>

                    <div style={styles.verticalBar}></div>

                    <div style={styles.descriptionColumn}>
                        {/* Campo para el comentario */}
                        <p style={styles.title}>Descripción:</p>
                        <textarea
                            name="comentario"
                            value={reviewData.comentario}
                            onChange={handleInputChange}
                            style={styles.textarea}
                            placeholder="Escribe una descripción..."
                        />
                        <div style={styles.buttonsContainer}>
                            <button style={styles.button} onClick={handleSubmit}>Enviar Reseña</button>
                            <button style={{ ...styles.button, backgroundColor: '#aaa' }} onClick={onClose}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewReviewPopup;