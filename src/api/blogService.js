import apiClient from './axiosClient';

const blogService = {
    getAll: async () => {
        const response = await apiClient.get('/blogs');
        return response.data;
    },
    getById: async (id) => {
        const response = await apiClient.get(`/blogs/${id}`);
        return response.data;
    },
    create: async (blogData) => {
        // blogData: { title, content, userId, forumId, categoryId }
        const response = await apiClient.post('/blogs', blogData);
        return response.data;
    },
    update: async (id, blogData) => {
        const response = await apiClient.put(`/blogs/${id}`, blogData);
        return response.data;
    },
    delete: async (id) => {
        await apiClient.delete(`/blogs/${id}`);
    }
};

export default blogService;
