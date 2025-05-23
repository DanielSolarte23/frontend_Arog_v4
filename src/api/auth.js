import axios from "./axios";

export const registerRequest = user => axios.post(`aauth/register`, user)

export const loginRequest = user => axios.post(`aauth/login`, user)

export const verifyTokenRequest = () => axios.get('/aauth/verify')

// export const logoutRequest = () => axios.get('/logout')

export const verifyEmailRequest = async (token) => {
    return await axios.get(`/api/aauth/verify-email/${token}`);
};

export const requestPasswordResetRequest = async email => await axios.post('/request-password-reset', {email})

export const resetPasswordRequest = async (token, password) => {
    return await axios.post(`/api/reset-password/${token}`, { password });
};