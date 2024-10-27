// App.jsx
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/outside/Register';
import Search from './pages/inside/Search';
import Home from './pages/outside/Home';
import Profile from './pages/inside/Profile';
import Contact from './pages/outside/Contact';
import Login from './pages/outside/Login';
import ProfileDetails from './pages/inside/ProfileDetails';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={
            <ProtectedRoute>
                <Search/>
            </ProtectedRoute>
        }  />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        }  />
        <Route path="/profile-details" element={<ProfileDetails />} />
      </Routes>
    </Router>
  );
}

export default App;