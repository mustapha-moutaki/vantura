import apiClient from './axiosClient';

const authService = {
  login: async ({ username, password }) => {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data; 
  },


  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/current');
    return response.data;
  }
};

export default authService;