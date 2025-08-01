import axios from 'axios';

const API_URL = 'https://skvap-assignment-1.onrender.com/api/auth';

export const authService = {
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },

  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  }
};