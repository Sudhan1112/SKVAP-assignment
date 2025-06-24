import axios from 'axios';

const API_URL = '/api/bookings';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const bookingService = {
  bookTest: async (bookingData) => {
    const response = await axios.post(`${API_URL}/book`, bookingData, getAuthHeaders());
    return response.data;
  },

  getMyBookings: async () => {
    const response = await axios.get(`${API_URL}/my-bookings`, getAuthHeaders());
    return response.data;
  },

  cancelBooking: async (bookingId) => {
    const response = await axios.patch(`${API_URL}/cancel/${bookingId}`, {}, getAuthHeaders());
    return response.data;
  },

  downloadReport: async (bookingId) => {
    const response = await axios.get(`${API_URL}/report/${bookingId}`, getAuthHeaders());
    return response.data;
  }
};