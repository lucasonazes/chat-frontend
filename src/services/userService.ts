import api from '@/lib/api';

export const userService = {
  getAll: () => api.get('/users'),
  getMe: () => api.get('/users/me')
};
