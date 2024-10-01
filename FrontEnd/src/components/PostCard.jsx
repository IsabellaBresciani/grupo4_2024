import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import '../css/PostCard.css'; // Asegúrate de crear este archivo CSS

const PostCard = (props) => {
    const {post} = props
    console.log(post)

    return (
       
                
                        <div className="post-card" key={post.idPublicacion}>
                            <div className="post-header"> 
                                <i className="fas fa-user-circle"></i>
                                <span className="post-user">{post.usuario}</span>
                                <span className="post-date">{new Date(post.fecha).toLocaleDateString()}</span>
                            </div>
                            <div className="post-content">
                                <h3>{post.titulo}</h3>  {/* Mostrar el título de la publicación */}
                                <img src={post.imagen} alt={post.titulo} className="post-image" />
                                <p>{post.descripcion}</p>
                            </div>
                        </div>
       
        
    );
};

export default PostCard;