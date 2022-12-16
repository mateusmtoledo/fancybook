import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  withCredentials: true,
  baseURL,
});

export default api;
