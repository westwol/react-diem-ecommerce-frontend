import axiosClient from '../config/axios';

export const submitNewOrder = async(address, city, state, zip, country, cart) => {
    try {
        const order = await axiosClient.post('/order',{
            address,
            country,
            city,
            state,
            zip,
            cart
        });
        return order.data;
    } catch (error) {
        throw error;
    }
}

export const getOrders = async() => {
    try {
        const order = await axiosClient.get('/order');
        return order.data
    } catch (error) {
        throw error;
    }
}