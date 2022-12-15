import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  withCredentials: true,
  baseURL,
});

export default api;
