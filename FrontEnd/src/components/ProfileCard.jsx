import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
	profileCard: {
		display: 'flex',
		alignItems: 'center',
		border: '2px solid rgba(255, 135, 16, 0.8)',
		borderRadius: '10px',
		padding: '20px',
		maxWidth: '1000px',
		boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
		margin: '20px 0',
		textDecoration: 'none',
		color: 'inherit',
	},
	profileDetails: {
		flexGrow: 1,
		overflow: 'hidden',
	},
	columnContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	profileImage: {
		width: '100px',
		height: '100px',
		borderRadius: '50%',
		objectFit: 'cover',
		marginRight: '20px',
	},
	rightColumn: {
		width: '100%'
	},
	userName: {
		margin: 0,
		fontSize: '18px',
		fontWeight: 'bold',
	},
	detailText: {
		margin: '5px 0',
		color: '#555',
		fontSize: '14px',
	},
	profileRating: {
		display: 'flex',
		gap: '5px',
		fontSize: '20px',
		color: '#ffc107',
	},
	serviceList: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '5px',
		margin: '0px',
	},
	servicesTags: {
		padding: '8px 8px',
		backgroundColor: '#f0f0f0',
		borderRadius: '20px',
		display: 'flex',
		alignItems: 'center',
		fontSize: '14px',
		margin: '0px',
	},
};

function ProfileCard(props) {
	const { usuario, name, description, img, location } = props; 
	const [userName, setUserName] = useState("");
	 
	if (usuario === "me") {
		usuario = String(localStorage.getItem('usuario'));
		setUserName(usuario);
	}

	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchServices = async () => {
		try {
			const response = await axios.get(`http://localhost:4444/api/user/${usuario}/servicios`);
			const uniqueServices = response.data.filter(
				(service, index, self) =>
				index === self.findIndex((s) => s.idServicio === service.idServicio)
			);
			setServices(uniqueServices);
		} catch (err) {	
			if (err.response && err.response.status === 404) {
				setError([]);
			} else {
				setError('Error al cargar los servicios.');
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchServices();
	}, [userName]);
	console.log(props.usuario, userName)
	return (
		<Link to={userName === usuario ? `/profile` : `/profile/${usuario}`} style={styles.profileCard}>
			<div style={styles.profileDetails}>
				<div style={styles.columnContainer}>
					{/* Profile image */}
					<img 
            src={img}
            alt="Profile" 
            style={styles.profileImage} 
          />
					<div style={styles.rightColumn}>
						<div style={{display: 'flex', justifyContent: 'space-between'}}>
							<h3 style={styles.userName}>{name}</h3> {/* Cambiar por nombre de usuario y agregar el nombre abajo */}
							{/* Rating with stars */}
							<div style={styles.profileRating}>
								<span>★</span>
								<span>★</span>
								<span>★</span>
								<span>★</span>
								<span>★</span>
							</div>
						</div>
						<p style={styles.detailText}>Descripcion: {description}</p>
						<p style={styles.detailText}>Localidad: {location}</p>
						
					</div>
				</div>
				
				{/* Services list */}
				<h5>Servicios: </h5>
				<div style={styles.serviceList}>
					{services.length > 0 ? (
						services.map((service) => (
							<p key={service.idServicio} style={styles.servicesTags}>{service.description}</p>
						))
					) : (
						<p style={styles.profileDetailsText}>No hay servicios disponibles.</p>
					)}
				</div>
				
			</div>
		</Link>
	);
}

export default ProfileCard;