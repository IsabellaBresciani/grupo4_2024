import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import Layout from '../components/Layout';
import '../css/LogPageComponent.css';
import logo from '../assets/logo.png';



function LogPageComponent() {

    return (
   
       
                    <div className="register-info">
                        <img className="logo" src={logo} alt="ServiciosYa logo" />
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
    
   
    );
}

export default LogPageComponent;