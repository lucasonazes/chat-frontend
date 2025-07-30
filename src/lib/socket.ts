import { io, Socket } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
let socket: Socket;

export const initSocket = (token: string): Socket => {
  if (!socket) {
    socket = io(URL, {
      autoConnect: true,
      auth: { token }
    });
  }
  return socket;
};

export const getSocket = (): Socket => socket;
