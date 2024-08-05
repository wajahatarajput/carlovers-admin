import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Create an instance of axios with default settings
export const server: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URI, // Replace with your base URI
});

// Add a request interceptor if you need to modify requests before they are sent
server.interceptors.request.use(
    (config: any) => {
        // Modify the request config if needed
        return config;
    },
    (error: AxiosError) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Add a response interceptor if you need to handle responses or errors globally
server.interceptors.response.use(
    (response: AxiosResponse) => {
        // Modify the response data if needed
        return response;
    },
    (error: AxiosError) => {
        // Handle response errors
        return Promise.reject(error);
    }
);
