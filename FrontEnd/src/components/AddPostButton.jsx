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
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Filtro oscuro detrás del modal
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', /* Sombra para simular tarjeta */
        textAlign: 'Left', /* Contenido a la izquierza */

    },
    modalInput: {
        width: '100%',              // Ancho completo del input
        padding: '10px',            // Espaciado interno
        margin: '10px 0',           // Margen entre inputs
        border: '1px solid #ddd',   // Borde gris claro
        borderRadius: '5px',        // Bordes redondeados
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  // Sombra sutil
        fontSize: '1rem',           // Tamaño de fuente adecuado
        outline: 'none',            // Elimina el borde azul cuando se selecciona
        transition: 'border-color 0.3s ease', // Transición suave para el borde
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
    addButton: {
        backgroundColor: '#FF8C00',  // Color de fondo naranja
        color: 'white',              // Color del texto
        padding: '10px 20px',        // Espaciado interno
        border: 'none',              // Sin borde
        borderRadius: '5px',         // Bordes redondeados
        cursor: 'pointer',           // Cambia el cursor al pasar por encima
        marginTop: '10px',           // Margen superior para separarlo de otros elementos
    },
    cancelButton: {
        backgroundColor: '#bbb',    // Color de fondo gris claro
        color: 'black',             // Color del texto
        padding: '10px 20px',       // Espaciado interno
        border: 'none',             // Sin borde
        borderRadius: '5px',        // Bordes redondeados
        cursor: 'pointer',          // Cambia el cursor al pasar por encima
        marginTop: '10px',          // Margen superior para separarlo de otros elementos
        marginLeft: '10px',          // Espacio entre botones
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
            const userName = String(localStorage.getItem('usuario'));

            const userData = await axios.get(`http://localhost:4444/api/user/${userName}`);
            const dataToSend = {
                fecha: new Date().toISOString().split('T')[0],
                descripcion: newPost.descripcion,
                titulo: newPost.titulo,
                imagen: newPost.imagen,
                idUser: userData.data.id,
            };

            await axios.post('http://localhost:4444/api/publication', dataToSend);
            setIsModalOpen(false);
            fetchPosts();
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
                                    style={styles.modalInput}
                                    onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
                                    onBlur={(e) => (e.target.style.borderColor = '#ddd')} // Vuelve al color original cuando se pierde el foco
                                />
                            </div>
                            <label htmlFor="descripcion">Descripción</label>
                            <div>                            
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={newPost.descripcion}
                                    onChange={handleChange}
                                    placeholder="Ingrese una breve descripción"
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
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
                                    style={styles.modalInput}
                                    onFocus={(e) => (e.target.style.borderColor = styles.modalInputFocus.borderColor)}
                                    onBlur={(e) => (e.target.style.borderColor = '#ddd')} // Vuelve al color original cuando se pierde el foco
                                />
                            </div>

                            {/* Contenedor de botones */}
                            <div style={styles.buttonsContainer}>
                                        <button
                                            type="button"
                                            style={styles.addButton}
                                            onClick={handleAddPost}
                                        >
                                            Agregar
                                        </button>
                                        <button
                                            type="button"
                                            style={styles.cancelButton}
                                            onClick={() => setIsModalOpen(false)}
                                            
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddPostButton;
