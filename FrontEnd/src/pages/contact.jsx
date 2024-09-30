import React from 'react';
import LayoutWithoutLogin from '../components/LayoutWithoutLogin'; // Asegúrate de usar el mismo layout que en las otras páginas
import '../css/contact.css'; 

const Contact = () => {
  return (
    <LayoutWithoutLogin> {/* Aquí se incluye el Header y Footer que ya están en el Layout */}
      <div className="contact-container">
        <h1>Contactanos</h1>
        <p>Somos el grupo 4 de Desarrollo de Software:</p>

        <div className="contact-info">
          <div className="contact-card">
            <h3>Atencion al cliente</h3>
            <p>Email: grupo4@serviciosya.com</p>
            <p>Telefono: +54 (221) 123-4567</p>
            <p>Horario de atencion: Mon-Fri 9:00 AM - 6:00 PM</p>
          </div>

          <div className="contact-card">
            <h3>Consultas sobre Ventas</h3>
            <p>Email: ventas@serviciosya.com</p>
            <p>Telefono: +54 (221) 987-6543</p>
            <p>Horario de atencion: Mon-Fri 10:00 AM - 5:00 PM</p>
          </div>

          <div className="contact-card">
            <h3>Soporte Tecnico</h3>
            <p>Email: soportetecnico@serviciosya.com</p>
            <p>Telefono: +54 (221) 555-4321</p>
            <p>Horario de atencion: Mon-Fri 8:00 AM - 5:00 PM</p>
          </div>
        </div>

        <div className="contact-form">
          <h3>¡Envianos un mensaje!</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Tu nombre: </label>
              <input type="text" id="name" name="name" placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Tu email: </label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Tu mensaje: </label>
              <textarea id="message" name="message" rows="5" placeholder="Enter your message" required></textarea>
            </div>

            <button type="submit">Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </LayoutWithoutLogin>
  );
};

export default Contact;
