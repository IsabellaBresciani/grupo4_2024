import React, { useState } from 'react';
import LayoutOutside from '../../components/LayoutOutside';
import LogPageComponent from '../../components/LogPageComponent';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../../css/Styles.css';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const styles = {

    loginContainer: {
        backgroundImage: "linear-gradient(to bottom, #ff6702, #f69d5d)",
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        minHeight: "95vh",
        flexGrow: 1,
        padding: "4vw"
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: '40vw',
        maxWidth: "55vw",
        alignItems: 'center',
    },
    formTitle: {
        fontSize: '3em',
        marginBottom: '20px',
        color: 'white',
        fontWeight: '0.5',
        margin: '5vh',
    },
    logo: {
        width: '10vw',
        marginBottom: '8vh',
        height: 'auto',
    },
    divInput:{
        color: "white",
    },
    registerForm: {
        flex: 1,
        color: 'rgb(255, 255, 255)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '30vw',
    },
    input: {
        marginBottom: '15px',
        padding: '10px',
        minWidth: '40vw',
        maxWidth: "55vw",
        fontSize: '1em',
        color: 'white',
        backgroundColor: 'transparent',
        border: '1px solid #ffffff',
        borderRadius: '5px',
    },
    button: {
        padding: '15px',
        fontSize: '1em',
        backgroundColor: '#000000',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
    },
    buttonHover: {
        backgroundColor: '#555',
    },
    placeholder: {
        color: 'white',
        opacity: 1,
    },
};

function Login() {
   
    const [usuario, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const credentials = {
                usuario: usuario,
                password: password
            };
        
            const response = await api.login(credentials);
            
            
            if (response.status === 200) {
                const { token, user } = response.data;
                login(token, user);
                navigate('/search');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            Swal.fire({
                title: 'Error',
                text: error.response ? error.response.data.error : 'Hubo un problema al iniciar sesión.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo',
            });
        }
    };

    return (
        <LayoutOutside>  

            <div style={styles.loginContainer}>
                <LogPageComponent/> 
                <div style={styles.formContainer}>
                    <h2 style={styles.formTitle}>Login</h2>
                    <form style={styles.registerForm} onSubmit={handleSubmit}>
                    <div>
                        <div style={styles.divInput} >
                            <input
                                style={styles.input}
                                type="text"
                                id="usuario"
                                value={usuario}
                                onChange={(e) => setUser(e.target.value)}
                                required
                                placeholder="Usuario"
                            />
                        </div>
                        <div style={styles.divInput}>
                            <input
                                style={styles.input}
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Contraseña"
                            />
                        </div>
                        <button style={styles.button}>Login</button>
                    </div>
                    </form>
                    
                </div>
            </div>
   
        </LayoutOutside> 
    );
}

export default Login;