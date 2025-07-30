import api from '@/lib/api';

export const authService = {
  login: (email: string, password: string) => api.post('/login', { email, password }),

  register: (name: string, email: string, password: string) => api.post('/register', { name, email, password })
};
