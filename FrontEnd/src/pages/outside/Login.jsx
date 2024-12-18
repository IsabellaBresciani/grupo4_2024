import React, { useState } from 'react';
import LayoutOutside from '../../components/LayoutOutside';
import LogPageComponent from '../../components/LogPageComponent';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Use the custom hook
import { api } from '../../utils/api';


const styles = {

    loginContainer: {
        backgroundImage: "linear-gradient(to bottom, #e85d04, #ff6702)",
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
    registerForm: {
        flex: 1,
        color: 'rgb(255, 255, 255)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '30vw',
    },
    divInput:{
        display: 'flex',
        flexDirection: 'row',
        color: "white",
        border: '1px solid #ffffff',
        borderRadius: '5px',
        marginBottom: '15px',
        width: '40vw',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    input: {
        padding: '10px',
        minWidth: '35vw',
        maxWidth: "55vw",
        fontSize: '1em',
        color: 'black',
        backgroundColor: 'white',
        outline: 'none',
        border: 'none',
    },
    isVisible: { 
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        backgroundColor: 'white',
        fontSize: '18px',
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
    
};

function Login() {
    const [usuario, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate(); 
    const { login } = useAuth(); // Using the hook to get login function

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const credentials = {
                usuario,
                password
            };
            console.log(credentials);

            const response = await api.login(credentials);
            
            if (response.status === 200) {
                const { token } = response.data;
                const set_local_storage_res = login(token, usuario); 
                if (set_local_storage_res){
                    console.log('Navigating to /profile...');
                    navigate('/profile');
                    window.location.reload();
                }
                
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
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };


    return (
        <LayoutOutside>  
            <div style={styles.loginContainer}>
                <LogPageComponent/> 
                <div style={styles.formContainer}>
                    <h2 style={styles.formTitle}>Login</h2>
                    <form style={styles.registerForm} onSubmit={handleSubmit}>
                        <div>
                            <div style={styles.divInput}>
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
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Contraseña"
                                />
                                <button
                                    type="button"
                                    style={styles.isVisible}
                                    onClick={togglePasswordVisibility}
                                >
                                    <i className={`fas ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`} style={{ marginRight: '10px', color: 'black' }}></i>
                                </button>
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