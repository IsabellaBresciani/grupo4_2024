import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const renderRating = (label, value, minLabel, maxLabel) => (
  <div style={styles.singleBar}>
    <p style={styles.title}>{label}</p>
    <div style={styles.ratingBar}>
      <div style={{ ...styles.filledBar, width: `${Math.min(value*20, 100)}%` }}></div>
    </div>
    <div style={styles.detailLabelContainer}>
      <p>{minLabel}</p>
      <p>{maxLabel}</p>
    </div>
  </div>
);

const ReviewCard = ({ asociacionId }) => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchReviewsWithUser = async () => {
      try {
        // Obtener reseñas
        const reviewsResponse = await axios.get(`http://localhost:4444/api/review/${asociacionId}/asociacion`);
        const reviewsData = reviewsResponse.data;

        console.log("Datos de reseñas:", reviewsData); // Verificar reseñas recibidas
        setReviews(reviewsData); // Guardar solo las reseñas

        // Obtener usuarios en paralelo
        const userPromises = reviewsData.map(review => {
          return axios.get(`http://localhost:4444/api/user/id/${review.idAutor}`)
            .then(userResponse => {
              const userData = userResponse.data[0]; // Asegúrate de acceder al primer elemento
              return {
                idAutor: review.idAutor,
                usuario: userData.usuario || "Usuario desconocido", // Usar el nombre de usuario
                foto: userData.foto || null // Usar la foto
              };
            })
            .catch(error => {
              console.error(`Error al obtener datos de usuario para la reseña ${review.idreview}:`, error);
              return { idAutor: review.idAutor, usuario: "Usuario desconocido", foto: null }; // Valor por defecto en caso de error
            });
        });

        // Esperar a que se resuelvan todas las promesas
        const usersData = await Promise.all(userPromises);
        const usersMap = Object.fromEntries(usersData.map(user => [user.idAutor, user]));
        setUsers(usersMap);

      } catch (error) {
        console.error("Error al obtener las reseñas o los usuarios:", error);
      }
    };

    fetchReviewsWithUser();
  }, [asociacionId]);

  // Renderizado condicional si no hay reseñas aún
  if (reviews.length === 0) {
    return <div>Cargando reseñas...</div>;
  }

  return (
    <div>
      {reviews.map((review) => {
        const user = users[review.idAutor] || { usuario: "Usuario desconocido", foto: null }; // Obtener el usuario correspondiente

        return (
          <div key={review.idreview} style={styles.reviewCard}>
            <div style={styles.leftColumn}>
              <div style={styles.avatarContainer}>
                <img
                  src={user.foto || 'https://via.placeholder.com/50'} // Usar un placeholder si foto es null
                  alt="Avatar"
                  style={styles.avatar}
                />
                <p style={styles.userName}>{user.usuario}</p>
              </div>
              <div style={styles.description}>{review.comentario}</div>
            </div>

            <div style={styles.verticalBar}></div>

            <div style={styles.rightColumn}>
              <div style={styles.ratingBarsContainer}>
                {renderRating("Precio", review.precio, "Malo", "Excelente")}
                {renderRating("Calidad", review.calidad, "Pésima", "Admirable")}
                {renderRating("Atención al cliente", review.atencion, "Antisocial", "Muy atento")}
                {renderRating("Tiempo del trabajo", review.tiempo, "Muy lento", "Muy veloz")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewCard;