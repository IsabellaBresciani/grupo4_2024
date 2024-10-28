// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    const login = (token, usuario) => {
        console.log(token, usuario)
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        return true
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('usuario');
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};