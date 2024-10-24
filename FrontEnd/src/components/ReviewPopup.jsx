import React, { useState } from 'react';
import NewReviewPopup from './NewReviewPopup';

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
		borderRadius: '10px', 
		width: '50%',
		padding: '20px',
		marginTop:'50px',
		maxHeight: '100vh', 
		overflowY: 'auto', 
		paddingRight: '20px', 
		boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',

		// Para ocultar la scrollbar en diferentes navegadores:
		scrollbarWidth: 'none', // Firefox
		'&::-webkit-scrollbar': { // Chrome, Safari y navegadores basados en WebKit
			display: 'none',
		},
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

  	ratingGeneral: {
    	fontSize: '100px',
    	textAlign: 'center',
    	fontWeight: '500',
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

	buttonContainer: {
		display: 'flex',
		justifyContent: 'center',  
	},

	button: {
        padding: '5px 10px',
        backgroundColor: '#ff7f11',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
		width:'40%',
		height: '50px',
        
    },


}
// Defino los valores de cada Rating (esto deberia venir desde la BD)
const precioRating = '20%';
const calidadRating = '50%';
const atencionRating = '4%';
const tiempoRating = '90%';

const ReviewPopup = ({ show, onClose }) => {
	//funciones para el segundo popup que permitira crear una nueva reseña
	const [showPopupNR, setShowPopupNR] = useState(false);

	const handleOpenPopupNR = () => {
		setShowPopupNR(true);
	};
	
	const handleClosePopupNR = () => {
		setShowPopupNR(false);
	};

  // Si no debe mostrarse, no renderizamos nada
	if (!show) {
    	return null;
	}

  // Si debe mostrarse, renderizamos el pop-up
	return (
		<div style={styles.popupOverlay} onClick={onClose}>
			<div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
				<button style={styles.closeButton} onClick={onClose}>X</button>
				<h2>Reseñas del servicio</h2>
				<p style={styles.ratingGeneral}>3.5</p>         {/* Este valor tiene que venir de la BD */}
				
				<div style={styles.ratingBarsContainer}>

					{/* Barra para el precio */}
					<p style={styles.title}>Precio</p>
					<div style={styles.ratingBar}>
						<div style={{ ...styles.filledBar, width: precioRating }}></div>
					</div>
					<div style={styles.detailLabelContainer}>
						<p>Malo</p>
						<p>Excelente</p>
					</div>
					
					{/* Barra para la calidad */}
					<p style={styles.title}>Calidad</p>
					<div style={styles.ratingBar}>
						<div style={{ ...styles.filledBar, width: calidadRating }}></div>
					</div>
					<div style={styles.detailLabelContainer}>
						<p>Pesima</p>
						<p>Admirable</p>
					</div>

					{/* Barra para la atencion al cliente */}
					<p style={styles.title}>Atencion al cliente</p>
					<div style={styles.ratingBar}>
						<div style={{ ...styles.filledBar, width: atencionRating }}></div>
					</div>
					<div style={styles.detailLabelContainer}>
						<p>Antisocial</p>
						<p>Muy atento</p>
					</div>

					{/* Barra para la Tiempo del trabajo */}
					<p style={styles.title}>Tiempo del trabajo</p>
					<div style={styles.ratingBar}>
						<div style={{ ...styles.filledBar, width: tiempoRating }}></div>
					</div>
					<div style={styles.detailLabelContainer}>
						<p>Muy lento</p>
						<p>Muy veloz</p>
					</div>
				</div>
				
				<div style={styles.buttonContainer}>
					<button style={styles.button} onClick={handleOpenPopupNR}>Dar una reseña</button>
				</div>
				{/* Renderizamos el segundo popup si showPopupNR es true */}
				<NewReviewPopup show={showPopupNR} onClose={handleClosePopupNR} />
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					Queria poder scrollear
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				<p>
					a
				</p>
				
			</div>
		</div>
  	);
};

export default ReviewPopup;