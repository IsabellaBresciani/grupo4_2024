// App.jsx
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/outside/Register';
import Search from './pages/inside/Search';
import Search2 from './pages/inside/Search2';
import Home from './pages/outside/Home';
import Profile from './pages/inside/Profile';
import Contact from './pages/outside/Contact';
import Login from './pages/outside/Login';
import ProfileDetails from './pages/inside/ProfileDetails';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);
  return (
    <>
    <Toaster containerStyle={{zIndex: '1000'}}/>
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/search" element={<Search />} />
            <Route path="/search2" element={<Search2 />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:usuario" element={<ProfileDetails />} />
            <Route path="/profile-details" element={<ProfileDetails />} />
            <Route path="*" element={<Navigate to="/search" />} /> {/* Redirect to search if authenticated */}
          </>
        ) : (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/search2" element={<Search2 />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login if not authenticated */}
          </>
        )}
      </Routes>
    </Router>
    </>
  );
}

export default App;