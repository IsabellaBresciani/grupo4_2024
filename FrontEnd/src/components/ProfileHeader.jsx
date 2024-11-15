import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const styles = {
	profileHeader: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		borderBottom: '1px solid #ddd',
		paddingBottom: '10px',
		marginBottom: '20px',
	},
	profileImage: {
		marginRight: '15px',
		borderRadius: '120px',
		maxHeight: '200px',
		maxWidth: '200px',
		height: '300px',
		width: '300px',
		overflow: 'hidden',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileInfo: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	modal: {
		position: 'fixed',
		top: '0',
		left: '0',
		width: '100vw',
		height: '100vh',
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Filtro oscuro detrás del modal
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
	},
	modalContent: {
		backgroundColor: 'white',
		maxHeight: '90vh',
		padding: '20px',
		borderRadius: '10px',
		width: '400px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
		textAlign: 'Left', 
		overflowY: 'auto',
	},
	modalInput: {
		width: '100%',              
		padding: '10px',            
		margin: '10px 0',           
		border: '1px solid #ddd',   
		borderRadius: '5px',        
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  
		fontSize: '1rem',           
		outline: 'none',            
		transition: 'border-color 0.3s ease', 
	},
	modalInputFocus: {
		borderColor: '#FF8C00',     
	},
	modalLabel: {
		display: 'block',           
		marginBottom: '0px',        
		fontWeight: 'bold',         
	},
	buttonsContainer: {
		display: 'flex',
		justifyContent: 'flex-end',  
		marginTop: '20px',           
	},
	guardarButton: {
		backgroundColor: '#FF8C00',  
		color: 'white',              
		padding: '10px 20px',        
		border: 'none',              
		borderRadius: '5px',         
		cursor: 'pointer',           
		marginTop: '10px',           
	},
	cancelButton: {
		backgroundColor: '#ccc',    
		color: 'black',             
		padding: '10px 20px',       
		border: 'none',               
		borderRadius: '5px',        
		cursor: 'pointer',          
		marginTop: '10px',          
		marginLeft: '10px',          
	},
	nameRatingEdit: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		marginBottom: '10px',
	},
	profileDetailsHeader: {
		fontSize: '1.8rem',
		marginBottom: '5px',
		color: '#333',
		display: 'inline-block',
	},
	editIcon: {
		marginLeft: '10px',
		fontSize: '1.2rem',
		cursor: 'pointer',
		color: '#333',
		display: 'inline-block',
		backgroundColor: 'transparent',
		border: 'none', //se asegura que no tenga ningun borde por defecto
	},
	profileRating: {
		display: 'flex',
		alignItems: 'center',
		fontSize: '1rem',
		marginLeft: 'auto',
	},
	profileDetails: {
		listStyle: 'none',
		padding: 0,
		margin: 0,
		fontSize: '0.9rem',
		marginBottom: '20px',
	},
	profileDetailsItem: {
		marginBottom: '8px',
		display: 'flex',
		alignItems: 'center',
		color: '#555',
	},
	profileDescription: {
		width: '100%',
		paddingTop: '10px',
		marginTop: '10px',
		fontSize: '0.9rem',
		display: 'flex',
		flexDirection: 'column', // Para mantener la estructura del texto
		maxHeight: '200px', // Limita la altura máxima para evitar ocupar demasiado espacio
		overflowY: 'auto', // Permite desplazamiento vertical si la descripción es muy larga
		padding: '15px', // Espacio interior para que el texto no quede pegado al borde
		borderRadius: '5px', // Bordes redondeados para un mejor aspecto
	},
	
	profileDescriptionHeader: {
		marginRight: '10px',
		fontSize: '1rem',
		color: '#333',
	},
	profileDescriptionText: {
		color: '#555',
		marginLeft: '10px',
		flex: 1,
	},
	tag: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: '#e0e0e0',
		borderRadius: '15px',
		padding: '5px 10px',
		fontSize: '14px',
		color: '#333',
	},
	tagCloseButton: {
		marginLeft: '8px',
		background: 'transparent',
		border: 'none',
		color: '#888',
		fontSize: '16px',
		cursor: 'pointer',
	},

};

const ProfileHeader = (props) => {
	const [usuario, setUsuario] = useState(props.usuario);
	if (usuario === "me"){
		const usuario = String(localStorage.getItem('usuario'));
		setUsuario(usuario)
	}
	const [userData, setUserData] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newData, setNewData] = useState({
		nombre: '',
		apellido: '',
		foto: '',
		idLocalidad: '',
		telefono: '',
		descripcion: ''
	});
	const [locationsAll, setLocationsAll] = useState([]);



	const getData = async () => {
		try {
			const userD = await axios.get(`http://localhost:4444/api/user/${usuario}`);
			setUserData(userD.data);
		} catch (err) {
			setError('Error al obtener los datos del usuario');
		} finally {
			setLoading(false);
		}
	};

	const fetchLocationsAll = async () => {
		try {
			const response = await axios.get('http://localhost:4444/api/localidad');
			setLocationsAll(response.data);
		} catch (error) {
			console.error('Error fetching services:', error);
		}
	};

	const [locations, setLocations] = useState([]);
	// Fetch locations
	const fetchLocations = async () => {
		try {
			const response = await axios.get(`http://localhost:4444/api/localidad/usuario/${usuario}`);
			console.log('Localidades obtenidas:', response.data);  // Verifica qué datos está devolviendo la API

			setLocations(response.data);
		} catch (err) {
			if (err.response && err.response.status === 404) {
				setError([]);
			} else {
				setError('Error al cargar las localidades.');
			}
		} finally {
			setLoading(false);
		}
	};

	const associateLocation = async (idLocalidad) => {
		try {
			await axios.post(`http://localhost:4444/api/localidad/asociar`, {
				idPersona: userData.id,
				idLocalidad
			});
			fetchLocations(); // Refresca la lista de localidades asociadas
			toast.success('¡Localidad asociada exitosamente!');
		} catch (error) {
			console.error('Error al asociar la localidad:', error);
			toast.error('Hubo un error al asociar la localidad.');
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Manejar la selección de una nueva localidad
	const handleAddLocation = (e) => {
		const selectedId = e.target.value;
		if (!locations.find((loc) => loc.idLocalidad === selectedId)) {
			associateLocation(selectedId);
		}
	};

	// Eliminar una localidad asociada al usuario
	const handleRemoveLocation = async (idLocalidad) => {
		const idPersona = userData.id; // Obtener idPersona desde el estado
	  
		// Verifica que tanto idPersona como idLocalidad estén definidos antes de hacer la llamada
		if (!idPersona || !idLocalidad) {
		  toast.error('Error: falta información necesaria.');
		  return;
		}
	  
		console.log('idPersona:', idPersona);
		console.log('idLocalidad:', idLocalidad);
	  
		try {
		  // Cambiar la URL para usar el nuevo endpoint con los parámetros correctos
		  const response = await axios.delete(`http://localhost:4444/api/localidad/desasociar/${idPersona}/${idLocalidad}`);
		  if (response.status === 200) {
			fetchLocations(); // Refresca la lista de localidades asociadas
			toast.success('¡Localidad eliminada exitosamente!');
		  } else {
			toast.error('No se pudo eliminar la localidad.');
		  }
		} catch (error) {
		  console.error('Error al eliminar la localidad:', error);
		  toast.error('Hubo un error al eliminar la localidad.');
		}
	  };
	  

	const modifyData = async () => {
		const confirm = await Swal.fire({
            title: '¿Confirmar cambios?',
            text: "¿Estás seguro de que deseas modificar tus datos?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, modificar',
            cancelButtonText: 'Cancelar',
            zIndex: 1500,
        });
		
		if (!confirm) {
			return;
		} else {
			setIsModalOpen(false);
		}
		
		try {
			const dataUpdated = {
				...(newData.nombre && { nombre: newData.nombre }),
				...(newData.apellido && { apellido: newData.apellido }),
				...(newData.foto && { foto: newData.foto }),
				...(newData.telefono && { telefono: newData.telefono }),
				...(newData.descripcion && { descripcion: newData.descripcion }),
				...(newData.idLocalidad && { idLocalidad: newData.idLocalidad })
			};
			if (Object.keys(dataUpdated).length > 0) {
				await axios.put(`http://localhost:4444/api/user/${usuario}`, dataUpdated);
				toast.success('¡Datos modificados exitosamente!');
				getData(); // Refresca los datos después de la modificación
			}
		} catch (error) {
			console.error('Error al modificar los datos:', error);
			toast.error('Hubo un error al guardar los cambios.');
		}
	};

	useEffect(() => {
		fetchLocationsAll();
		getData();
		fetchLocations();
	}, []);

	useEffect(() => {
		if (Object.keys(userData).length > 0) {
			setNewData({
				nombre: userData.nombre || '',
				apellido: userData.apellido || '',
				foto: userData.foto || '',
				telefono: userData.telefono || '',
				descripcion: userData.descripcion || '',
				idLocalidad: userData.idLocalidad || '',
			});
		}
	}, [userData]);
	
	const cancelModification = () => {
		setNewData(getData());
		setIsModalOpen(false)
	}
	const formatDate = (fechaISO) => {
		const fecha = new Date(fechaISO);
		const year = fecha.getFullYear();
		const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
		const day = fecha.getDate().toString().padStart(2, '0');
		return `${day}/${month}/${year}`;
	};


	if (loading) return <p>Cargando datos...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div style={styles.profileHeader}>
			<div style={styles.profileImage}>
				<img src={userData.foto} alt="Imagen del perfil" style={{ borderRadius: '120px', maxHeight: '200px', maxWidth: '200px' }} />
			</div>
			<div style={styles.profileInfo}>
				<div style={styles.nameRatingEdit}>
					<h1 style={styles.profileDetailsHeader}>{userData.nombre} {userData.apellido}</h1>
					<button style={styles.editIcon} onClick={() => setIsModalOpen(true)}>
					{props.usuario === "me" && (
						<FontAwesomeIcon icon={faEdit} />
					)} 
					
				</button>

					{isModalOpen && (
						<div style={styles.modal}>
							<div style={styles.modalContent}>
								<h3>Modificar datos personales</h3>
								<form>
									<div>
										<label htmlFor="nombre" style={styles.modalLabel}>Nombre</label>
										<input
											type="text"
											id="nombre"
											name="nombre"
											value={newData.nombre}
											onChange={handleChange}
											style={styles.modalInput}
											onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
											onBlur={(e) => (e.target.style.borderColor = '#ddd')} // Vuelve al color original cuando se pierde el foco

										/>
									</div>
									<div>
										<label htmlFor="apellido" style={styles.modalLabel}>Apellido</label>
										<input
											type="text"
											id="apellido"
											name="apellido"
											value={newData.apellido}
											onChange={handleChange}
											style={styles.modalInput}
											onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
											onBlur={(e) => (e.target.style.borderColor = '#ddd')}
										/>
									</div>
									<div>
										<label htmlFor="foto" style={styles.modalLabel}>Imagen (URL)</label>
										<input
											type="text"
											id="foto"
											name="foto"
											value={newData.foto}
											onChange={handleChange}
											style={styles.modalInput}
											onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
											onBlur={(e) => (e.target.style.borderColor = '#ddd')}
										/>
									</div>
									<div>
										<label htmlFor="idLocalidad" style={styles.modalLabel}>Localidad</label>
										<select
											id="idLocalidad"
											name="idLocalidad"
											onClick={fetchLocationsAll}
											onChange={handleAddLocation} // Nuevo manejador
											style={styles.modalInput}
										>
											<option value="">Seleccione una localidad</option>
											{locationsAll.map((location) => (
												<option 
													key={location.idLocalidad} 
													value={location.idLocalidad}>
													{location.nombre}                                            
												</option>
											))}
										</select>
										<div style={{ ...styles.modalLabel, display: 'flex', flexDirection: 'row', gap: '5px', fontWeight: 'normal' }}>
											<p style={styles.modalLabel}>Localidades seleccionadas:</p>
											{locations.length > 0 ? (
												<div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
													{locations.map((location) => (
														<div key={location.idLocalidad} style={styles.tag}>
															<span>{location.nombre}</span>
															<button
																type="button"
																style={styles.tagCloseButton}
																onClick={() => handleRemoveLocation(location.idLocalidad)}
															>
																&times;
															</button>
														</div>
													))}
												</div>
											) : (
												<p style={styles.modalLabel}>Sin localidades asignadas.</p>
											)}
										</div>
									</div>
									<div>
										<label htmlFor="telefono" style={styles.modalLabel}>Teléfono</label>
										<input
											type="text"
											id="telefono"
											name="telefono"
											value={newData.telefono}
											onChange={handleChange}
											style={styles.modalInput}
											onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
											onBlur={(e) => (e.target.style.borderColor = '#ddd')}
										/>
									</div>
									<div>
										<label htmlFor="description" style={styles.modalLabel}>Descripción </label>
										<textarea
											type="text"
											id="descripcion"
											name="descripcion"
											value={newData.descripcion}
											onChange={handleChange}
											style={styles.modalInput}
											onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
											onBlur={(e) => (e.target.style.borderColor = '#ddd')}
										/>
									</div>
									{/* Contenedor de botones */}
									<div style={styles.buttonsContainer}>
										<button
											type="button"
											onClick={modifyData}
											style={styles.guardarButton}
										>
											Guardar cambios
										</button>
										<button
											type="button"
											onClick={cancelModification}
											style={{ ...styles.guardarButton, backgroundColor: '#bbb', color: 'black', marginLeft: '10px' }}
										>
											Cancelar
										</button>
									</div>
								</form>
							</div>
						</div>
					)}
					<div style={styles.profileRating}>
						<p>Puntuación:</p>
						<div className="stars">
							<i className="fas fa-star" style={{ color: '#FFD700', marginRight: '3px' }}></i>
							<i className="fas fa-star" style={{ color: '#FFD700', marginRight: '3px' }}></i>
							<i className="fas fa-star" style={{ color: '#FFD700', marginRight: '3px' }}></i>
							<i className="fas fa-star" style={{ color: '#FFD700', marginRight: '3px' }}></i>
							<i className="fas fa-star-half-alt" style={{ color: '#FFD700', marginRight: '3px' }}></i>
						</div>
					</div>
				</div>
				<ul style={styles.profileDetails}>
					<li style={styles.profileDetailsItem}>
						<i className="fas fa-user"></i>
						Fecha de nacimiento: {userData.fecha_nacimiento ? formatDate(userData.fecha_nacimiento) : 'Fecha no disponible'}
					</li>
					
					<li style={styles.profileDetailsItem}><i className="fas fa-map-marker-alt"></i> Localidades:
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px', alignItems: 'center', marginLeft: '5px' }}>
						{locations.length > 0 ? (
							<p style={styles.profileDetailsItem}>{locations.map((location) => location.nombre).join(', ')}.</p>
						) : (
							<p style={styles.profileDetailsItem}>Sin localidades asignadas.</p>
						)}
					</div>
					</li>
					<li style={styles.profileDetailsItem}><i className="fas fa-envelope"></i> Email: {userData.email}</li>
					<li style={styles.profileDetailsItem}><i className="fas fa-phone"></i> Teléfono: {userData.telefono}</li>
				</ul>
			</div>
			<div style={styles.profileDescription}>
				<h3 style={styles.profileDescriptionHeader}>Descripción:</h3>
				<p>{userData.descripcion}</p>
			</div>
		</div>
	);
};

export default ProfileHeader;