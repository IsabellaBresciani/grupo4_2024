import React, { useState } from 'react';
import LayoutWithoutLogin from '../components/LayoutWithoutLogin';

import LogPageComponent from '../components/LogPageComponent';
import axios from 'axios'; // Import axios
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
function Login() {
    const [usuario, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const dataToSend = {
            usuario: usuario,
            password: password
        };

        try {
            console.log(dataToSend);
            const response = await axios.post('http://localhost:4444/api/login', dataToSend);

            if (response.status === 200) {
                const { token } = response.data; // Suponiendo que el token viene en el campo 'token'
                
                // Guardar el token en localStorage
                localStorage.setItem('jwtToken', token);

                // Redirigir al usuario a la página 'search'
                navigate('/profile');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            Swal.fire({
                title: 'Error',
                text: error.response ? error.response.data.error : 'Hubo un problema al iniciar sesión.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        }
    };

    return (
        <LayoutWithoutLogin>         
            <div className="login-container">
                <LogPageComponent className="register-info"/>
                
                <div className='form-container'>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                id="usuario"
                                value={usuario}
                                onChange={(e) => setUser(e.target.value)}
                                required
                                placeholder="Usuario"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Contraseña"
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </LayoutWithoutLogin>
    );
}

export default Login;