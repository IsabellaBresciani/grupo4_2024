import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Context from './context/Context';
import Register from './pages/Register';

import UserInterface from './pages/UserInterface';
import Search from './pages/Search';
import Home from './pages/Home';
import Profile from './pages/Profile.jsx';

import Contact from './pages/Contact.jsx'; // Importa el componente de contacto
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/register" element={<Register />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} /> {/* Añadir la ruta de Contact */}
            {/*<Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />*/}
            <Route path="/user/:id" element={<UserInterface />} />
            <Route path="/search" element={<Search />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
  );
}

export default App;
