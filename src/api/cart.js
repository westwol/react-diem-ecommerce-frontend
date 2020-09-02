import axiosClient from '../config/axios';

export const getCurrentCart = async(ids) => {
    try {
        const products = await axiosClient.post('/cart',{
            ids
        });
        return products.data;
    } catch (error) {
        throw error;
    }
}