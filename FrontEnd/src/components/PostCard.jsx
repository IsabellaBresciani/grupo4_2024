import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
	postsSection: {
		width: '100%',
		margin: '0 auto',
		padding: '20px',
		backgroundColor: '#f9f9f9',
	},
	postCards: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	postCard: {
		backgroundColor: 'white',
		borderRadius: '8px',
		boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
		padding: '20px',
		width: '100%',
		transition: 'transform 0.3s ease',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	postHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '15px',
		gap: '5px',
	},
	headerLeft: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
	},
	postUser: {
		fontSize: '1.1em',
		fontWeight: 'bold',
		color: '#333',
	},
	headerRight: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
	},
	postDate: {
		fontSize: '0.9em',
		color: '#888',
		justifyContent: 'right',
	},
	editButton: {
		outline: 'none',
		border: 'none',
		backgroundColor: 'white',
		fontSize: '20px',
	},
	trashButton: {
		outline: 'none',
		border: 'none',
		backgroundColor: 'white',
		fontSize: '18px',
		border: '2px solid red',
		borderRadius: '5px',
	},
	postContent: {
		color: '#333',
	},
	postImage: {
		width: '100%',
		height: '400px',
		borderRadius: '8px',
		marginBottom: '15px',
		objectFit: 'cover',
	},
	postDescription: {
		fontSize: '1em',
		color: '#555',
		lineHeight: '1.5',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	// Estilos para la modal (Para la modificacion de la publicaicon y el error de este)
	modal: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
	},
	modalContent: {
		backgroundColor: 'white',
		borderRadius: '8px',
		boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
		padding: '30px',
		width: '400px',
	},
	modalHeader: {
		fontSize: '1.5em',
		marginBottom: '20px',
		textAlign: 'center',
		color: '#333',
	},
	inputField: {
		width: '100%',
		padding: '10px',
		marginBottom: '15px',
		borderRadius: '5px',
		border: '1px solid #ddd',
		fontSize: '1em',
	},
	button: {
		padding: '10px 15px',
		borderRadius: '5px',
		border: 'none',
		color: 'white',
		backgroundColor: '#007BFF',
		cursor: 'pointer',
		marginRight: '10px',
		transition: 'background-color 0.3s',
	},
	cancelButton: {
		backgroundColor: '#dc3545',
	},
	errorModal: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'white',
		borderRadius: '8px',
		boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
		padding: '30px',
		width: '300px',
		textAlign: 'center',
		zIndex: 1001,
	},
	errorHeader: {
		fontSize: '1.5em',
		color: 'red',
		marginBottom: '20px',
	},
	errorButton: {
		padding: '10px 15px',
		borderRadius: '5px',
		border: 'none',
		color: 'white',
		backgroundColor: '#dc3545',
		cursor: 'pointer',
		transition: 'background-color 0.3s',
	},
};

const PostCard = (props) => {
    const [userName, setUserName] = useState(props.usuario);
    if (userName == "me"){
        const userName = String(localStorage.getItem('usuario'));
        setUserName(userName)
    }
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [currentPost, setCurrentPost] = useState(null);
	const [showErrorModal, setShowErrorModal] = useState(false);
	

	const fetchPosts = async () => {
		try {
			const response = await axios.get(`http://localhost:4444/api/publication/${userName}/posts`);
			const uniquePosts = response.data.filter(
				(post, index, self) =>
					index === self.findIndex((p) => p.idPublicacion === post.idPublicacion)
			);
			setPosts(uniquePosts);
		} catch (err) {
			setError(err.response && err.response.status === 404 ? 'No se encontraron publicaciones para este usuario.' : 'Error al cargar las publicaciones');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const handleDelete = async (id) => {
		if (window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")) {
			try {
				await axios.delete(`http://localhost:4444/api/publication/${id}`);
				setPosts(posts.filter(post => post.idPublicacion !== id));
			} catch (err) {
				setError('Error al eliminar la publicación');
			}
		}
	};

	const handleEdit = (post) => {
		setCurrentPost(post);
		setIsEditing(true);
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`http://localhost:4444/api/publication/${currentPost.idPublicacion}`, currentPost);
			setPosts(posts.map(post => (post.idPublicacion === currentPost.idPublicacion ? currentPost : post)));
			setIsEditing(false);
			setCurrentPost(null);
		} catch (err) {
			setShowErrorModal(true); // Muestra la ventana emergente de error
		}
	};

	if (loading) return <p>Cargando publicaciones...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div style={styles.postsSection}>
			<div style={styles.postCards}>
				{posts.length > 0 ? (
					posts.map((post) => (
						<div style={styles.postCard} key={post.idPublicacion}>
							<div style={styles.postHeader}>
								<div style={styles.headerLeft}>
									<i className="fas fa-user-circle" style={{ fontSize: '20px' }}></i>
									<span style={styles.postUser}>{post.usuario}</span>
								</div>
								<div style={styles.headerRight}>
									<span style={styles.postDate}>{new Date(post.fecha).toLocaleDateString()}</span>
									<button style={styles.editButton} onClick={() => handleEdit(post)}>
										<i className="fas fa-edit"></i>
									</button>
									<button style={styles.trashButton} onClick={() => handleDelete(post.idPublicacion)}>
										<i className="fas fa-trash"></i>
									</button>
								</div>
							</div>
							<div style={styles.postContent}>
								<h3>{post.titulo}</h3>
								<img src={post.imagen} alt={post.titulo} style={styles.postImage} />
								<p style={styles.postDescription}>{post.descripcion}</p>
							</div>
						</div>
					))
				) : (
					<p>No hay publicaciones asociadas</p>
				)}
			</div>

			{/* Modal para editar publicación */}
			{isEditing && (
				<div style={styles.modal}>
					<div style={styles.modalContent}>
						<h2 style={styles.modalHeader}>Editar Publicación</h2>
						<form onSubmit={handleUpdate}>
							<input
								type="text"
								style={styles.inputField}
								value={currentPost.titulo}
								onChange={(e) => setCurrentPost({ ...currentPost, titulo: e.target.value })}
								placeholder="Título"
							/>
							<input
								type="text"
								style={styles.inputField}
								value={currentPost.descripcion}
								onChange={(e) => setCurrentPost({ ...currentPost, descripcion: e.target.value })}
								placeholder="Descripción"
							/>
							{/* Campo que falta */}
							<input
								type="text"
								style={styles.inputField}
								value={currentPost.imagen}
								onChange={(e) => setCurrentPost({ ...currentPost, imagen: e.target.value })}
								placeholder="URL de la imagen"
							/>
							<button type="submit" style={styles.button}>Guardar Cambios</button>
							<button type="button" style={styles.cancelButton} onClick={() => setIsEditing(false)}>Cancelar</button>
						</form>
					</div>
				</div>
			)}

			{/* Modal de error */}
			{showErrorModal && (
				<div style={styles.modal}>
					<div style={styles.errorModal}>
						<h2 style={styles.errorHeader}>Error al Modificar</h2>
						<p>Hubo un problema al modificar la publicación. Por favor, inténtalo de nuevo.</p>
						<button style={styles.errorButton} onClick={() => setShowErrorModal(false)}>Cerrar</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostCard;