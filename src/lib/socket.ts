import { io, Socket } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
let socket: Socket;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(URL, {
      autoConnect: false,
      auth: {
        token: localStorage.getItem('token')
      }
    });
  }
  return socket;
};
