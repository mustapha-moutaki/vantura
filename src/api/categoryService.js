import apiClient from './axiosClient';

const categoryService = {
    getAll: async () => {
        const response = await apiClient.get('/categories');
        return response.data;
    },
    create: async (categoryData) => {
        // categoryData: { name, description }
        const response = await apiClient.post('/categories', categoryData);
        return response.data;
    },
    delete: async (id) => {
        await apiClient.delete(`/categories/${id}`);
    }
};

export default categoryService;
