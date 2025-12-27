import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
    withCredentials: true, 
});

// Optional: request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;
