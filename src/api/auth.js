import axiosClient from '../config/axios';

export const signIn = async(email, password) => {
    try {
        const authUser = await axiosClient.post('/auth/login', {
            email,
            password
        });
        return authUser.data;
    } catch (error) {
        throw error;
    }
}

export const signUp = async(name, last_name, email, password) => {
    try {
        const registerUser = await axiosClient.post('/auth/register', {
            email,
            password,
            name,
            last_name
        });
        return registerUser.data;
    } catch (error) {
        throw error;
    }
}

export const isMe = async() => {
    try {
        const isMe = await axiosClient.get('/auth/me');
        return isMe.data;
    } catch (error) {
        throw error;
    }
}