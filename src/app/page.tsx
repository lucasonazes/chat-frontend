'use client';

import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getSocket } from '@/lib/socket';
import { IMessage } from '@/types/message';
import axios from 'axios';

export default function Home() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

  useEffect(() => {
    const s = getSocket();
    setSocket(s);
    s.connect();

    s.on('receive_message', (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) return alert('Not authenticated');

    const { data } = await axios.post(
      `${API_URL}/messages`,
      {
        content: newMessage,
        receiverId: '04bb36dc-94f8-4d83-acd6-c3a389431ad6'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    socket?.emit('send_message', data);
    setNewMessage('');
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="border p-2 rounded h-64 overflow-y-auto bg-gray-50 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <span className="font-semibold mr-2">{msg.senderId}</span>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input type="text" className="flex-1 border p-2 rounded" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
          Enviar
        </button>
      </div>
    </main>
  );
}
