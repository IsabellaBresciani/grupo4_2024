import React, { useEffect, useState } from 'react';
import NewReviewPopup from './NewReviewPopup';
import ReviewCard from './ReviewCard';
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

const ReviewPopup = ({ show, onClose, idAsociacionservi }) => {
	const [showPopupNR, setShowPopupNR] = useState(false);
	const handleOpenPopupNR = () => {
		setShowPopupNR(true);
	};
	const handleClosePopupNR = () => {
		setShowPopupNR(false);
	};

	const [ratings, setRatings] = useState({
		precio: '',
		calidad: '',
		atencion: '',
		tiempo: '',
	  });

	  useEffect(() => {
		if (idAsociacionservi) {
		  const getRatings = async () => {
			let precioTotal = 0;
			let calidadTotal = 0;
			let atencionTotal = 0;
			let tiempoTotal = 0;
	
			try {
			  const response = await axios.get(`http://localhost:4444/api/review/asociacion/${idAsociacionservi}`);
			  const reviews = response.data;
				if (reviews.length !== 0) {
				reviews.forEach((review) => {
					precioTotal += review.precio;
					calidadTotal += review.calidad;
					atencionTotal += review.atencion;
					tiempoTotal += review.tiempo;
				});
		
				const precioFinal = reviews.length ? precioTotal / reviews.length : 0;
				const calidadFinal = reviews.length ? calidadTotal / reviews.length : 0;
				const atencionFinal = reviews.length ? atencionTotal / reviews.length : 0;
				const tiempoFinal = reviews.length ? tiempoTotal / reviews.length : 0;
		
				setRatings({
					precio: precioFinal,
					calidad: calidadFinal,
					atencion: atencionFinal,
					tiempo: tiempoFinal,
				});}
				else{
					setRatings({
						precio: 0,
						calidad: 0,
						atencion: 0,
						tiempo: 0,
					})
				}
			} catch (error) {
			  console.error('Error al generar el promedio de reseñas', error);
			}
		  };
	
		  getRatings();
		}
	  }, [idAsociacionservi]);
	
	  const RatingTotal = ((ratings.precio + ratings.calidad + ratings.atencion + ratings.tiempo) / 4).toFixed(1);



	const renderRating = (label, value, minLabel, maxLabel) => (
		<div style={styles.ratingRow}>
		  <p style={styles.title}>{label}</p>
		  <div style={styles.ratingBar}>
			<div style={{ ...styles.filledBar, width: value }}></div>
		  </div>
		  <div style={styles.detailLabelContainer}>
			<p>{minLabel}</p>
			<p>{maxLabel}</p>
		  </div>
		</div>
	);

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
				<p style={styles.ratingGeneral}>{RatingTotal}</p>
				
				<div style={styles.ratingBarsContainer}>
          {renderRating("Precio", `${ratings.precio*100/5}%`, "Malo", "Excelente")}
          {renderRating("Calidad", `${ratings.calidad*100/5}%`, "Pésima", "Admirable")}
          {renderRating("Atención al cliente", `${ratings.atencion*100/5}%`, "Antisocial", "Muy atento")}
          {renderRating("Tiempo del trabajo", `${ratings.tiempo*100/5}%`, "Muy lento", "Muy veloz")}
        </div>
				
				{/*Este button no deberia mostrarse cuando visito mi propio perfil*/}
					<div style={styles.buttonContainer}>
						<button style={styles.button} onClick={handleOpenPopupNR}>Dar una reseña</button>
					</div>
				

				<NewReviewPopup show={showPopupNR} onClose={handleClosePopupNR} asociacionId={idAsociacionservi} />
				<ReviewCard idAsociacionservi={idAsociacionservi}/>
        
  		</div>
		</div>
  );
};

export default ReviewPopup;