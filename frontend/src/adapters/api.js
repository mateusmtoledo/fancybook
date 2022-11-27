import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
  return config;
});

export default api;
