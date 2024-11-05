import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const styles = {
	postsSection: {
		width: '100%',
		margin: '0 auto',
		padding: '20px',
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
	// Estilos para la modal (Para la modificacion de la publicaicon y el error de estego)
	modal: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
	},
	modalContent: {
		backgroundColor: 'white',
		borderRadius: '20px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
		padding: '20px',
		width: '400px',
		textAlign: 'Left',
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
		margin: '10px 0',
		border: '1px solid #ddd',
		borderRadius: '5px',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
		fontSize: '1rem',
		outline: 'none',
		transition: 'border-color 0.3s ease',
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
		marginRight: '10px', 
	},
	modalInputFocus: {
		borderColor: '#FF8C00',     // Cambia el color del borde al hacer focus
	},
	modalLabel: {
		display: 'block',           // Asegura que las etiquetas ocupen su propia línea
		marginBottom: '0px',        // Margen inferior para separar de los inputs
		fontWeight: 'bold',         // Hace que las etiquetas sean más notorias
	},
	buttonsContainer: {
		display: 'flex',
		justifyContent: 'flex-end',  // Alinea los botones a la derecha
		marginTop: '20px',           // Margen superior para separar de los inputs
	},
	textarea: {
		width: '100%',
		height: '150px',
		padding: '10px',
		margin: '10px 0',
		border: '1px solid #ddd',
		borderRadius: '5px',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
		fontSize: '1rem',
		outline: 'none',
		transition: 'border-color 0.3s ease',
  	boxSizing: 'border-box',
  	resize: 'vertical', // Permite cambiar el tamaño solo en altura
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
	});

	const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
			color:'#d33',
      text: 'Esta acción NO se podrá revertir',
      icon: 'warning',
      showCancelButton: true,
			confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
      	try {
          await axios.delete(`http://localhost:4444/api/publication/${id}`);
          setPosts(posts.filter(post => post.idPublicacion !== id));
          Swal.fire(
            'Eliminado',
            'La publicación ha sido eliminada con éxito.',
            'success'
          );
          } catch (err) {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar la publicación. Por favor, inténtalo de nuevo.',
              'error'
            );
          }
        }
			}
		);
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

			Swal.fire({
				icon: 'success',
				title: 'Publicación actualizada',
				text: 'La publicación se modificó con éxito',
				confirmButtonColor: '#ff8c00',
		});
		} catch (err) {
			Swal.fire({
					icon: 'error',
					title: 'Error al Modificar',
					text: 'Hubo un problema al modificar la publicación. Por favor, inténtalo de nuevo.',
					confirmButtonText: 'Cerrar',
			});
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
							<div>
								<label htmlFor="titulo" style={styles.modalLabel}>Titulo: </label>
								<input
									type="text"
									style={styles.inputField}
									value={currentPost.titulo}
									onChange={(e) => setCurrentPost({ ...currentPost, titulo: e.target.value })}
									placeholder="Título"
									onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
									onBlur={(e) => (e.target.style.borderColor = '#ddd')} 
								/>
							</div>
							<div>
								<label htmlFor="titulo" style={styles.modalLabel}>Descripcion: </label>
								<textarea
									type="text"
									style={styles.textarea}
									value={currentPost.descripcion}
									onChange={(e) => setCurrentPost({ ...currentPost, descripcion: e.target.value })}
									placeholder="Descripción"
									onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
									onBlur={(e) => (e.target.style.borderColor = '#ddd')} 
								/>
							</div>
							<div>
								<label htmlFor="titulo" style={styles.modalLabel}>Imagen: </label>
								<input
									type="text"
									style={styles.inputField}
									value={currentPost.imagen}
									onChange={(e) => setCurrentPost({ ...currentPost, imagen: e.target.value })}
									placeholder="URL de la imagen"
									onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
									onBlur={(e) => (e.target.style.borderColor = '#ddd')} 
								/>
							</div>
							<div style={styles.buttonsContainer}>
								<button type="submit" style={styles.button}>Guardar Cambios</button>
								<button type="button" style={{...styles.button, backgroundColor: '#bbb'}} onClick={() => setIsEditing(false)}>Cancelar</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostCard;