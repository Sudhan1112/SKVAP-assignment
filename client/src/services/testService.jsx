import axios from 'axios';

const API_URL = 'https://skvap-assignment-1.onrender.com/api/tests';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const testService = {
  getAllTests: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getTestById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
};