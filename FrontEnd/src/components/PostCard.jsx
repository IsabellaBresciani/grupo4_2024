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
};

const PostCard = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const userName = localStorage.getItem('usuario');
	
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
								<button style={styles.editButton}>
									<i className="fas fa-edit" ></i>
                </button>
								<button style={styles.trashButton}>
									<i className="fas fa-trash" ></i>
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
	</div>
	);
};

export default PostCard;
