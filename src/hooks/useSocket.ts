import { useEffect } from 'react';
import { getSocket, initSocket } from '@/lib/socket';
import { IMessage } from '@/types/message';

export const useSocket = (loggedUserId: string | null, token: string | null, onMessage: (msg: IMessage) => void) => {
  useEffect(() => {
    if (!loggedUserId || !token) return;

    const socket = initSocket(token);

    socket.emit('join', loggedUserId);
    socket.on('receiveMessage', onMessage);

    return () => {
      socket.off('receiveMessage', onMessage);
    };
  }, [loggedUserId, token, onMessage]);

  return getSocket();
};
