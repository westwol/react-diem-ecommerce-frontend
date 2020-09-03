import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://diem-ecommerce-backend.herokuapp.com'
});

export default axiosClient;