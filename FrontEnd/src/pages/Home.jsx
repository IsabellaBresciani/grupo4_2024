import React from 'react';
import LayoutWithoutLogin from '../components/LayoutWithoutLogin'; // Make sure to import your layout component
import '../css/Home.css';
function Home() {
    return (
        <LayoutWithoutLogin>
            <div className="container">
                <h1>Servicios</h1>
                <p>Todos los servicios a la puerta de tu casa</p>

                <input type="text" placeholder="Hinted search text" className="search-bar" />

                <div className="service-grid">
                    <div className="service-card">
                        <h3>Jarinería</h3>
                        <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                    </div>
                    <div className="service-card">
                        <h3>Plomería</h3>
                        <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                    </div>
                    <div className="service-card">
                        <h3>Electricistas</h3>
                        <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                    </div>
                    <div className="service-card">
                        <h3>Lava Autos</h3>
                        <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                    </div>
                    <div className="service-card">
                        <h3>Paseadores de mascotas</h3>
                        <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                    </div>
                    <div className="service-card">
                        <h3>Pilet destrezas</h3>
                        <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                    </div>
                    <div className="service-card">
                        <h3>Masajistas</h3>
                        <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                    </div>
                    <div className="service-card">
                        <h3>Técnicos en Aires Acondicionados</h3>
                        <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                    </div>
                    <div className="service-card">
                        <h3>Personal Trainers</h3>
                        <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                    </div>
                </div>
            </div>
        </LayoutWithoutLogin>
    );
}

export default Home;