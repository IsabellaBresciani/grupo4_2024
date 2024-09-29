import React, { useState } from 'react';
import '../css/ServiceCard.css'; // Asegúrate de crear este archivo CSS también

const ServiceCard = ({ service, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [serviceData, setServiceData] = useState(service);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const handleSaveClick = () => {
        onEdit(serviceData); // Llama a la función para actualizar el servicio
        setIsEditing(false); // Cierra el modo de edición
    };

    return (
        <div className="service-card">
            <img src={serviceData.image} alt={serviceData.title} />
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="title"
                        value={serviceData.title}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="description"
                        value={serviceData.description}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSaveClick}>Guardar</button>
                </div>
            ) : (
                <div>
                    <h3>{serviceData.title}</h3>
                    <p>{serviceData.description}</p>
                    <div className="star-rating">
                        {/* Renderiza las estrellas de acuerdo con el rating */}
                        {[...Array(5)].map((star, index) => (
                            <i
                                key={index}
                                className={
                                    index < serviceData.rating
                                        ? 'fas fa-star'
                                        : 'far fa-star'
                                }
                            ></i>
                        ))}
                    </div>
                    <button onClick={handleEditClick}>Editar</button>
                </div>
            )}
        </div>
    );
};

export default ServiceCard;