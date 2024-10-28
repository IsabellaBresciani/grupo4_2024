import React from 'react';


const styles = {
  reviewCard: {
    display: 'flex',
    flexDirection: 'row',
    border: '2px solid #ff8000',
    marginTop: '10px',
    borderRadius: '10px',
    padding: '10px',
    maxWidth: '1000px',
    alignItems: 'center',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: '1',
    gap: '10px',
    width: '50%',
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px', // espacio entre el avatar y el nombre de usuario
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    alignSelf: 'center',
  },
  userName: {
    fontWeight: 'bold',
    marginTop: '10px',
    alignSelf: 'center',
  },
  description: {
    width: '90%',
    height: '300px',
    backgroundColor: '#ddd',
    textAlign: 'left',
    display: 'flex',
    padding: '10px',    
    alignSelf: 'center',
  },
  verticalBar: {
    width: '2px',
    borderRadius: '3px',
    height: '350px',  
    backgroundColor: '#ff8000',
    marginLeft: '10px',  
    marginRight: '10px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    gap: '10px',
    width: '50%',
  },
  singleBar: {
    margin: '0',
  },
  ratingBarsContainer: {
		display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    maxWidth: '100%',
  },
  title: {
		fontWeight: '500',
		margin: '0', 
		paddingBottom: '2px', 
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

};

const precioRating = '20%';
const calidadRating = '50%';
const atencionRating = '4%';
const tiempoRating = '90%';

const renderRating = (label, value, minLabel, maxLabel) => (
  <div style={styles.singleBar}>
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

const ReviewCard = () => {
  return (
    <div style={styles.reviewCard}>
      <div style={styles.leftColumn}>
        {/*-----------Columna Izquierda----------*/}
        <div style={styles.avatarContainer}>
          <div style={styles.avatar}></div>
          <p style={styles.userName}>Nombre de usuario</p>
        </div>
        <div style={styles.description}>Descripcion...</div>
      </div>

      {/*-----------Barra central----------*/}
      <div style={styles.verticalBar}></div>

      <div style={styles.rightColumn}>
        {/*-----------Columna Derecha----------*/}
        <div style={styles.ratingBarsContainer}>
          {renderRating("Precio", precioRating, "Malo", "Excelente")}
          {renderRating("Calidad", calidadRating, "Pésima", "Admirable")}
          {renderRating("Atención al cliente", atencionRating, "Antisocial", "Muy atento")}
          {renderRating("Tiempo del trabajo", tiempoRating, "Muy lento", "Muy veloz")}
        </div>
        
      </div>
    </div>    
    );
};

export default ReviewCard;