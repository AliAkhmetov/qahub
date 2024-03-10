import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.qahub.kz',
  timeout: 7000,
  withCredentials: true,
});

export default apiClient;
