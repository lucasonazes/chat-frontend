import api from '@/lib/api';

export const messageService = {
  getConversation: (user1: string, user2: string) => api.get(`/messages/${user1}/${user2}`)
};
