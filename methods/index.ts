import axios from "axios";

// utils/api.js
const API_URL = 'http://localhost:3001'; // Update with your API URL

// Set up Axios instance with Stripe secret key for authentication
export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

// Fetch all products from Stripe
export const fetchProducts = async () => {
    try {
        const response = await axios.get('../../../api/getProducts');
        return response.data; // Assuming Stripe API returns data in 'data' property
    } catch (error: any) {
        throw new Error(`Error fetching products: ${error.message}`);
    }
};

// Create a new product on Stripe
export const createProduct = async (productData: any) => {
    try {
        const response = await axios.post('../../../api/createProducts', productData);
        return response.data; // Assuming Stripe API returns created product data
    } catch (error: any) {
        throw new Error(`Error creating product: ${error.message}`);
    }
};

// Update an existing product on Stripe
export const updateProduct = async (productId: any, productData: any) => {
    try {
        const response = await axiosInstance.put(`../../../api/updateProducts/${productId}`, productData);
        return response.data; // Assuming Stripe API returns updated product data
    } catch (error: any) {
        throw new Error(`Error updating product: ${error.message}`);
    }
};

// Delete a product on Stripe
export const deleteProduct = async (productId: any) => {
    try {
        const response = await axiosInstance.delete(`../../../api/deleteProducts/${productId}`);
        return response.data; // Assuming Stripe API returns success message on deletion
    } catch (error: any) {
        throw new Error(`Error deleting product: ${error.message}`);
    }
};