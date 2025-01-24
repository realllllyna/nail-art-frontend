import axios from 'axios';

export const ApiUrl = process.env.VUE_APP_API_URL;

const api = axios.create({
    baseURL: ApiUrl,
});

export default api;