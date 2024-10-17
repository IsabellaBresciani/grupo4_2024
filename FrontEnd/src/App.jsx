import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Register from './pages/outside/Register.jsx';
import Search from './pages/inside/Search.jsx';
import Home from './pages/outside/Home';
import Profile from './pages/inside/Profile.jsx';
import Contact from './pages/outside/Contact.jsx'; // Importa el componente de contacto
import Login from './pages/outside/Login';


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/register" element={<Register />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} /> 
          
            <Route path="/search" element={<Search />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
  );
}

export default App;
