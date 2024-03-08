import axios from 'axios';
import { redirect } from 'next/navigation';

const apiClient = axios.create({
  baseURL: 'https://www.qahub.kz',
  timeout: 7000,
  withCredentials: true,
});

// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');

//   if (token) {
//     const parsedToken = JSON.parse(token);
//     config.headers.Authorization = `Bearer ${parsedToken.access}`;
//   }

//   return config;
// });

// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     // if (error.response.status === 401) {
//     // redirect('/signin');
//     // }
//     return Promise.reject(error);
//   },
// );

export default apiClient;
