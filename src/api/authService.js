import apiClient from './axiosClient';

const authService = {
  login: async ({ username, password }) => {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data; 
  },


  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/current');
    return response.data;
  },

  register: async (userData) => {
    // userData: { firstName, lastName, email, password, role }
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  }
};

export default authService;