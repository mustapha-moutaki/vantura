import apiClient from './axiosClient';

const categoryService = {
    getAll: async () => {
        const response = await apiClient.get('/categories');
        return response.data;
    },

    getById: async (id) => {
        const response = await apiClient.get(`/categories/${id}`);
        return response.data;
    },

    create: async (categoryData) => {
        // categoryData: { name, description }
        const response = await apiClient.post('/categories', categoryData);
        return response.data;
    },

    update: async (id, categoryData) => {
        const response = await apiClient.put(`/categories/${id}`, categoryData);
        return response.data;
    },

    delete: async (id) => {
        const response = await apiClient.delete(`/categories/${id}`);
        return response.data; // Returning data helps confirm deletion in UI
    }
};

export default categoryService;