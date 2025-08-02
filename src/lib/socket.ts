import { io, Socket } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
let socket: Socket | null = null;

export const initSocket = (token: string): Socket => {
  if (!socket || !socket.connect) {
    socket = io(URL, {
      autoConnect: true,
      auth: { token }
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;

export const resetSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
