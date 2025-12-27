import apiClient from './axiosClient';

const forumService = {
    getAll: async () => {
        const response = await apiClient.get('/forums');
        return response.data;
    },
    getById: async (id) => {
        const response = await apiClient.get(`/forums/${id}`);
        return response.data;
    },
    create: async (forumData) => {
        // forumData: { title, description, userId, userIds, blogsIds }
        const response = await apiClient.post('/forums', forumData);
        return response.data;
    },
    update: async (id, forumData) => {
        const response = await apiClient.put(`/forums/${id}`, forumData);
        return response.data;
    },
    delete: async (id) => {
        await apiClient.delete(`/forums/${id}`);
    }
};

export default forumService;
