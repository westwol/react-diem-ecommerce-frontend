import axiosClient from '../config/axios';

export const getHomeProductListing = async() => {
    try {
        const products = await axiosClient.get('/products');
        return products.data;
    } catch (error) {
        throw error;
    }
}

export const getProductById = async(id) => {
    try {
        const product = await axiosClient.get(`/products/${id}`);
        return product.data;
    } catch (error) {
        throw error;
    }
}