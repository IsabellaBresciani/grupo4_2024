// src/config/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4444/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para requests
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para responses
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;