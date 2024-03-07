import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://www.qahub.kz',
  timeout: 7000,
});
