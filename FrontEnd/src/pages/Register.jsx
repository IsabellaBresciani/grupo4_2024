import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../css/Register.css';
import initialUsers from "../jsons/json_users.json";
import logo from '../assets/logo.png';
import Swal from 'sweetalert2';

function Register() {
   
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        email: '',
        contraseña: '',
        repetirContraseña: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      
    

        console.log('Registered user:', formData);
    
        // Display success alert
        Swal.fire({
            title: 'Success!',
            text: 'You have registered successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    
        // Clear the form
        setFormData({
            nombre: '',
            apellido: '',
            dni: '',
            telefono: '',
            email: '',
            contraseña: '',
            repetirContraseña: '',
        });
    };

    return (
        <Layout>
            <div className='register-container'>
               
            <div className="register">
            
                <div className="register-info">
                <img class="logo" src={logo} alt="ServiciosYa logo" />
                    <h2 className="register-info-title">SOMOS</h2>
                    <h2 className="register-info-title-2">ServiciosYa</h2>
                    <p className="register-info-text">
                        Una plataforma que conecta a personas que necesitan ayuda
                        con tareas domesticas con profesionales que ofrecen estos
                        servicios.
                    </p>
                    <p className="register-info-text">
                        Podes buscar jardineros, plomeros, paseadores de perros,
                        peluquero, instalador de aires, profesor de matemáticas
                        para tu hijo o cualquier servicio que se te ocurra;
                        filtrando por ubicación, tipo de tarea y precio. Si sos
                        un profesional, también podes crear un perfil para ofrecer
                        tus servicios y llegar a nuevos clientes.
                    </p>
                </div>
                <div className="register-form">
                    <form onSubmit={handleSubmit}>
                        {Object.keys(formData).map((key) => (
                            <div key={key}>
                                <input
                                    type={key.includes('contraseña') ? 'password' : 'text'}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    placeholder={key[0].toUpperCase() + key.slice(1)}
                                    required
                                />
                            </div>
                        ))}
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
            </div>
        </Layout>
    );
}

export default Register;