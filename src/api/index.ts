import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.bugfix.kz',
  timeout: 7000,
  withCredentials: true,
});

export default apiClient;
