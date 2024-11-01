import React, { useState } from 'react';
import axios from 'axios';

const styles = {
    button: {
        fontSize: '16px',
        marginTop: '5px',
        padding: '5px 10px',
        backgroundColor: '#ff7f11',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        alignSelf: 'center',
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

const AddPostButton = ({ fetchPosts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPost, setNewPost] = useState({
        titulo: '',
        descripcion: '',
        imagen: '',
        fecha: new Date().toISOString().split('T')[0],
    });

    const handleAddPost = async () => {
        try {
            const dataToSend = {
                fecha: new Date().toISOString().split('T')[0],
                descripcion: newPost.descripcion,
                titulo: newPost.titulo,
                imagen: newPost.imagen,
                idUser: 17,
            };
            await axios.post('http://localhost:4444/api/publication', dataToSend);
            setIsModalOpen(false);
            fetchPosts(); // Actualizar publicaciones en el componente principal
        } catch (error) {
            console.error('Error al agregar la publicación:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    return (
        <>
            <button style={styles.button} onClick={() => setIsModalOpen(true)}>Agregar Publicación</button>
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
        </>
    );
};

export default AddPostButton;
