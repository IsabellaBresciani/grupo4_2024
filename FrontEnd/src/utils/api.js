// src/utils/api.js
import axios from '../config/axios';

export const api = {
    login: (credentials) => axios.post('/login', credentials),
    getUser: (id) => axios.get(`/users/${id}`),
    updateUser: (id, data) => axios.put(`/users/${id}`, data),
    logout: async () => {
        const response = await axios.post('/auth/logout'); 
        return response;
    }
    // ... más métodos
};