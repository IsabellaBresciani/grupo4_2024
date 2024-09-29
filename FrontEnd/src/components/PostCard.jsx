import React, { useState } from 'react';
import '../css/PostCard.css'; //Asegúrate de crear este archivo CSS también

const PostCard = ({ post, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [postData, setPostData] = useState(post);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const handleSaveClick = () => {
        onEdit(postData); // Llama a la función para actualizar la publicación
        setIsEditing(false); // Cierra el modo de edición
    };

    return (
        <div className="post-card">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="title"
                        value={postData.title}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="content"
                        value={postData.content}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSaveClick}>Guardar</button>
                </div>
            ) : (
                <div>
                    <div className="post-header">
                        <i className="fas fa-user-circle"></i>
                        <span className="post-user">{postData.user}</span>
                        <span className="post-date">{postData.date}</span>
                    </div>
                    <div className="post-content">
                        <img src={postData.image} alt={postData.title} />
                        <p>{postData.content}</p>
                    </div>
                    <button onClick={handleEditClick}>Editar</button>
                </div>
            )}
        </div>
    );
};

export default PostCard;