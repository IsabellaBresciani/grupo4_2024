import React, { useState } from 'react';
import axios from 'axios'; 
import LogPageComponent from '../../components/LogPageComponent';
import Swal from 'sweetalert2';
import LayoutOutside from '../../components/LayoutOutside';
import logo from '../../assets/logo.png';
import '../../css/Styles.css';

const styles = {
   
    registerContainer: {
        backgroundImage: "linear-gradient(to bottom, #ff6702, #f69d5d)",
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        minHeight: "94vh",
        flexGrow: 1,
        padding: "0vw 2vw"
    },

    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formTitle: {
        fontSize: "3em",
        marginBottom: '20px',
        color: 'white',
        fontWeight: 0.5,
        margin: '4vh',
    },
    registerForm: {
        flex: 1,
        color: 'rgb(255, 255, 255)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    input: {
        marginBottom: '15px',
        padding: '10px',
        minWidth: '40vw',
        maxWidth: "60vw",
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
    divInput:{
        color: "white",
    }
};

function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        fecha_nacimiento: '',
        email: '',
        usuario: '',
        password: '',
        confirm_password: ''
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

        const dataToSend = {
            ...formData,
            password: formData.password // Assuming 'contraseña' is the password
        };

        try {
            console.log(dataToSend);
            const response = await axios.post('http://localhost:4444/api/signup', dataToSend);
            console.log(response);
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
                password: '',
                confirm_password: ''
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
        <LayoutOutside> 
          
                <section style={styles.registerContainer}>
                <LogPageComponent  />
                <div style={styles.formContainer}>
                    <h2 style={styles.formTitle}>Register</h2>
                    <form style={styles.registerForm} onSubmit={handleSubmit}>
                        <div>
                        
                            {Object.keys(formData).map((key) => (
                                <div style={styles.divInput}  key={key}>
                                    <input
                                        type={
                                            key === 'password' || key === 'confirm_password' 
                                            ? 'password' 
                                            : key === 'fecha_nacimiento' 
                                            ? 'date' 
                                            : 'text'
                                        }
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        placeholder={key[0].toUpperCase() + key.slice(1)}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                            ))}
                            <button type="submit" style={styles.button}>Register</button>
                        
                    </div>
                    </form>
                </div>
            </section>
   
        </LayoutOutside> 
    );
}

export default Register;