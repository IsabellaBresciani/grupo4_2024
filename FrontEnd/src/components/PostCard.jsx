import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/PostCard.css'; // Asegúrate de crear este archivo CSS

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
            const response = await axios.get('http://localhost:4444/api/publication/17/posts');  // Cambia el 17 por el idPersona dinámico si es necesario
            const uniquePosts = response.data.filter(
                (posts, index, self) =>
                    index === self.findIndex((p) => p.idPublicacion === posts.idPublicacion)
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
                fecha: new Date().toISOString().split('T')[0], // Solo fecha (YYYY-MM-DD)
                descripcion: newPost.descripcion, // Usar newPost para acceder a los valores
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
            [name]: value // Actualiza el campo correspondiente (titulo, descripcion, imagen)
        }));
    };

    // Llamar a la función cuando el componente se monta
    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) return <p>Cargando publicaciones...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="posts-section">
            <div className="post-cards">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div className="post-card" key={post.idPublicacion}>
                            <div className="post-header">
                                <i className="fas fa-user-circle"></i>
                                <span className="post-user">{post.usuario}</span>
                                <span className="post-date">{new Date(post.fecha).toLocaleDateString()}</span>
                            </div>
                            <div className="post-content">
                                <h3>{post.titulo}</h3> 
                                <img src={post.imagen} alt={post.titulo} className="post-image" />
                                <p>{post.descripcion}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay publicaciones asociadas</p>
                )}
            </div>

            <div>
                <button onClick={() => setIsModalOpen(true)}>Agregar Publicación</button>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
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
                            <button type="button" onClick={handleAddPost}>Agregar</button>
                            <button type="button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;
