import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    const hadToken = !!localStorage.getItem('token');

    if (status === 401 || status === 403) {
      if (hadToken) toast.error('Session expired');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (data?.errors?.length) {
      toast.error(data.errors[0].message);
    } else if (data?.message) {
      toast.error(data.message);
    } else {
      toast.error('Unexpected error');
    }

    return Promise.reject(data || { success: false, code: 'UNKNOWN_ERROR', message: 'Unexpected error' });
  }
);

export default api;
