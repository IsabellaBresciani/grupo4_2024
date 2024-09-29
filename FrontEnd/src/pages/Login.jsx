import React, { useState, useEffect, useContext } from 'react';
import LayoutWithoutLogin from '../components/LayoutWithoutLogin';
import '../css/Login.css';
import LogPageComponent from '../components/LogPageComponent';

import axios from 'axios'; // Import axios
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

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
                // If login is successful, redirect to /search
                navigate('/search');
            }
            
            // Clear the form
          
        } catch (error) {
            console.error('Error registering user:', error);
            Swal.fire({
                title: 'Error',
                text: error.response ? error.response.data.error : 'There was an issue with your registration.',
                icon: 'error',
                confirmButtonText: 'Try again'
            });
        }
    };

    return (
        <LayoutWithoutLogin>         
            <div className="login-container">
                <LogPageComponent className="register-info"/>
                
              
                <div className='form-containter'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        
                        <input
                            type="text"
                            id="usuario"
                            value={usuario}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" >Login</button>
                </form>
                </div>
            </div>
        </LayoutWithoutLogin>
    );
}

export default Login;