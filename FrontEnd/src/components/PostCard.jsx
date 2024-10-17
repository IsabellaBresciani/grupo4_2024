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
    postCardHover: {
        transform: 'translateY(-5px)',
    },
    postHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '15px',
    },
    postUser: {
        fontSize: '1.1em',
        fontWeight: 'bold',
        color: '#333',
    },
    postDate: {
        fontSize: '0.9em',
        color: '#888',
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
    button: {
        backgroundColor: '#ff7f11',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '1em',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#ff5500',
    },
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
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '100%',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    },
};

const PostCard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [newPost, setNewPost] = useState({
        titulo: '',
        descripcion: '',
        imagen: '',
        fecha: new Date().toISOString().split('T')[0],  // Solo fecha (YYYY-MM-DD)
    });

    // Función para obtener las publicaciones del usuario
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:4444/api/publication/17/posts');  
            const uniquePosts = response.data.filter(
                (post, index, self) =>
                    index === self.findIndex((p) => p.idPublicacion === post.idPublicacion)
            );
            setPosts(uniquePosts);
        } catch (err) {
            setError('Error al cargar las publicaciones');
        } finally {
            setLoading(false);
        }
    };

    // Función para manejar el envío de una nueva publicación
    const handleAddPost = async () => {
        try {
            const dataToSend = {
                fecha: new Date().toISOString().split('T')[0],
                descripcion: newPost.descripcion,
                titulo: newPost.titulo, 
                imagen: newPost.imagen, 
                idUser: 17 // ID de la persona
            };
           
            await axios.post('http://localhost:4444/api/publication', dataToSend);
            setIsModalOpen(false); // Cerrar el modal
            fetchPosts(); // Recargar las publicaciones
        } catch (error) {
            console.error('Error al agregar la publicación:', error);
        }
    };

    // Manejar cambios en el formulario del modal
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prevPost) => ({
            ...prevPost,
            [name]: value
        }));
    };

    // Llamar a la función cuando el componente se monta
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
                                <i className="fas fa-user-circle"></i>
                                <span style={styles.postUser}>{post.usuario}</span>
                                <span style={styles.postDate}>{new Date(post.fecha).toLocaleDateString()}</span>
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

            <div>
                <button style={styles.button} onClick={() => setIsModalOpen(true)}>Agregar Publicación</button>
            </div>

            {isModalOpen && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h3>Agregar nueva publicación</h3>
                        <form>
                            <div>
                                <label htmlFor="titulo">Título</label>
                                <input
                                    type="text"
                                    id="titulo"
                                    name="titulo"
                                    value={newPost.titulo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={newPost.descripcion}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="imagen">Imagen (URL)</label>
                                <input
                                    type="text"
                                    id="imagen"
                                    name="imagen"
                                    value={newPost.imagen}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="button" style={styles.button} onClick={handleAddPost}>Agregar</button>
                            <button type="button" style={styles.button} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;