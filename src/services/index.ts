import axios from 'axios';
import { redirect } from 'next/navigation';

const apiClient = axios.create({
  baseURL: 'https://www.qahub.kz',
  timeout: 7000,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    const parsedToken = JSON.parse(token);
    config.headers.Authorization = `Bearer ${parsedToken.access}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (!error || !error.response || !error.response.status) return;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      window.location.href = '/signin';

      return apiClient(originalRequest);
    }
  },
);

export default apiClient;
