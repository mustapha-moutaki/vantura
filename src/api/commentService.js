import apiClient from './axiosClient';

const commentService = {
    getByBlogId: async (blogId) => {
        const response = await apiClient.get(`/comments/blog/${blogId}`);
        return response.data;
    },
    create: async (commentData) => {
        // commentData: { content, userId, blogId }
        const response = await apiClient.post('/comments', commentData);
        return response.data;
    },
    delete: async (id) => {
        await apiClient.delete(`/comments/${id}`);
    }
};

export default commentService;
