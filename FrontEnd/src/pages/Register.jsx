import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import LogPageComponent from '../components/LogPageComponent';
import '../css/Register.css';
import logo from '../assets/logo.png';
import Swal from 'sweetalert2';
import initialUsers from "../jsons/json_users.json";
import LayoutWithoutLogin from '../components/LayoutWithoutLogin';

function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        fecha_nacimiento: '',
        email: '',
        usuario: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data to match back-end expectations
        const dataToSend = {
            ...formData,
            password: formData.password // Assuming 'contraseña' is the password
        };

        try {
            console.log(dataToSend);
            const response = await axios.post('http://localhost:8080/register', dataToSend);
            
            Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Clear the form
            setFormData({
                nombre: '',
                apellido: '',
                dni: '',
                fecha_nacimiento: '',
                email: '',
                usuario: '',
                password: ''
            });
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
        // (No changes needed in JSX for layout)
// Just ensure LogPageComponent aligns properly with the style above
<LayoutWithoutLogin>
    <div className='register-container'>
       
            <LogPageComponent className="register-info" />
            <div className='form-containter'>
                <form onSubmit={handleSubmit}>
                    {Object.keys(formData).map((key) => (
                        <div key={key}>
                            <input
                                type={key.includes('password') ? 'password' : 'text'}
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
    </LayoutWithoutLogin>
    );
}

export default Register;