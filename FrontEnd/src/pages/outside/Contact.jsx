import React from 'react';
import LayoutOutside from '../../components/LayoutOutside';

const styles = {
    contactContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    contactInfo: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '40px',
    },
    contactCard: {
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        maxWidth: '350px',
        textAlign: 'left',
    },
    contactCardTitle: {
        color: '#ff6702',
        fontSize: '1.5em',
        marginBottom: '10px',
        fontWeight: "bold"
    },
    contactCardText: {
        fontSize: '1.1em',
        lineHeight: 1.6,
        marginBottom: '10px',
        color: '#333',
    },
    contactForm: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '0 auto',
    },
    formGroup: {
        marginBottom: '15px',
    },
    formLabel: {
        display: 'block',
        marginBottom: '5px',
        fontSize: '1.1em',
        color: '#555',
    },
    formInput: {
        width: '100%',
        padding: '10px',
        fontSize: '1em',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxSizing: 'border-box',
    },
    contactButton: {
        backgroundColor: '#ff6702',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '1.1em',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    contactButtonHover: {
        backgroundColor: '#e65c00',
    },
};

const Contact = () => {
    return (
        <LayoutOutside>
            <div style={styles.contactContainer}>
                <h1>Contactanos</h1>
                <p>Somos el "Equipo 4" de Desarrollo de Software, conformado por:</p>
                <div>Battistella Tomás</div>
                <div>Bresciani Isabella</div>
                <div>Hiriart Irineo</div>
                <div>Leiva Emanuel</div>
                <div>Ortega Jonathan</div>
                <div>Tiero Maximiliano</div>
                <div style={{ height: '20px' }}></div>

                <div style={styles.contactInfo}>
                    <div style={styles.contactCard}>
                        <h3 style={styles.contactCardTitle}>Atención al cliente</h3>
                        <p style={styles.contactCardText}>Email: grupo4@serviciosya.com</p>
                        <p style={styles.contactCardText}>Teléfono: +54 (221) 123-4567</p>
                        <p style={styles.contactCardText}>Horario de atencion: Mon-Fri 9:00 AM - 6:00 PM</p>
                    </div>

                    <div style={styles.contactCard}>
                        <h3 style={styles.contactCardTitle}>Consultas sobre ventas</h3>
                        <p style={styles.contactCardText}>Email: ventas@serviciosya.com</p>
                        <p style={styles.contactCardText}>Teléfono: +54 (221) 987-6543</p>
                        <p style={styles.contactCardText}>Horario de atención: Mon-Fri 10:00 AM - 5:00 PM</p>
                    </div>

                    <div style={styles.contactCard}>
                        <h3 style={styles.contactCardTitle}>Soporte técnico</h3>
                        <p style={styles.contactCardText}>Email: soportetecnico@serviciosya.com</p>
                        <p style={styles.contactCardText}>Teléfono: +54 (221) 555-4321</p>
                        <p style={styles.contactCardText}>Horario de atención: Mon-Fri 8:00 AM - 5:00 PM</p>
                    </div>
                </div>

                <div style={styles.contactForm}>
                    <h3 style={{ color: '#333', fontSize: '1.8em', marginBottom: '20px' }}>¡Envianos un mensaje!</h3>
                    <form>
                        <div style={styles.formGroup}>
                            <label style={styles.formLabel} htmlFor="name">Tu nombre: </label>
                            <input style={styles.formInput} type="text" id="name" name="name" placeholder="Enter your name" required />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.formLabel} htmlFor="email">Tu email: </label>
                            <input style={styles.formInput} type="email" id="email" name="email" placeholder="Enter your email" required />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.formLabel} htmlFor="message">Tu mensaje: </label>
                            <textarea style={{ ...styles.formInput, resize: 'none' }} id="message" name="message" rows="5" placeholder="Enter your message" required></textarea>
                        </div>

                        <button style={styles.contactButton} type="submit">Enviar Mensaje</button>
                    </form>
                </div>
            </div>
        </LayoutOutside>
    );
};

export default Contact;