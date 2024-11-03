import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

function LogPageComponent() {


    const styles = {
        registerInfo: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
            maxWidth: '700px',
            minWidth: '50vw', // Usar el estado para minWidth
            padding: '0vw 4vw 0vw 0vw'
        },
        registerInfoTitle: {
            fontSize: "2em",
            fontWeight: 700, // Cambiado a un valor numérico para mejor consistencia
            color: 'black',
        },
        registerInfoTitle2: {
            fontSize: "3em",
            marginBottom: '20px',
            color: 'white',
            fontWeight: 700, // Cambiado a un valor numérico
        },
        logo: {
            width: "20vh"
        },
        registerInfoText: {
            fontSize: "1em",
            lineHeight: 1.5,
            marginBottom: '1em',
        },
    };

    return (
        <div style={styles.registerInfo}>
            <img style={styles.logo} src={logo} alt="ServiciosYa logo" />
            <h2 style={styles.registerInfoTitle}>SOMOS</h2>
            <h2 style={styles.registerInfoTitle2}>ServiciosYa</h2>
            <p style={styles.registerInfoText}>
                Una plataforma que conecta a personas que necesitan ayuda
                con tareas domésticas con profesionales que ofrecen estos
                servicios.
            </p>
            <p style={styles.registerInfoText}>
                Podés buscar jardineros, plomeros, paseadores de perros,
                peluquero, instalador de aires, profesor de matemáticas
                para tu hijo o cualquier servicio que se te ocurra;
                filtrando por ubicación, tipo de tarea y precio. Si sos
                un profesional, también podés crear un perfil para ofrecer
                tus servicios y llegar a nuevos clientes.
            </p>
        </div>
    );
}

export default LogPageComponent;