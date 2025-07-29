'use client';

import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getSocket } from '@/lib/socket';
import { IMessage } from '@/types/message';
import { IUser } from '@/types/user';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export default function Home() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [loggedUser, setLoggedUser] = useState<IUser | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const router = useRouter();

  useEffect(() => {
    const fetchUsersAndMe = async () => {
      if (!token) {
        toast.error('Not authenticated');
        router.push('/login');
      }

      const headers = { Authorization: `Bearer ${token}` };

      const userRes = await axios.get(API_URL + '/users', { headers });
      setUsers(userRes.data);

      const meRes = await axios.get(API_URL + '/users/me', { headers });
      setLoggedUser(meRes.data);
    };

    fetchUsersAndMe();
  }, [token, router]);

  useEffect(() => {
    const s = getSocket();
    setSocket(s);
    s.connect();

    const handleMessage = (message: IMessage) => {
      if (selectedUser && (message.senderId === selectedUser.id || message.receiverId === selectedUser.id)) {
        setMessages((prev) => [...prev, message]);
      }
    };

    s.on('receive_message', handleMessage);

    return () => {
      s.off('receive_message', handleMessage);
      s.disconnect();
    };
  }, [selectedUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!loggedUser || !selectedUser || !token) return;

      const res = await axios.get(`${API_URL}/messages/${loggedUser.id}/${selectedUser.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages(res.data);
    };

    fetchMessages();
  }, [loggedUser, selectedUser, token]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const { data } = await axios.post(
      `${API_URL}/messages`,
      {
        content: newMessage,
        receiverId: selectedUser.id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    socket?.emit('send_message', data);
    setMessages((prev) => [...prev, data]);
    setNewMessage('');
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>

      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Usuários:</h2>
        <div className="flex flex-wrap gap-2">
          {users
            .filter((u) => u.id !== loggedUser?.id)
            .map((user) => (
              <button
                key={user.id}
                className={`px-2 py-1 rounded border ${selectedUser?.id === user.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedUser(user)}
              >
                {user.name}
              </button>
            ))}
          {users.length === 0 && <p className="text-gray-500">Nenhum usuário encontrado</p>}
        </div>
      </section>

      {selectedUser && (
        <h2 className="text-md font-medium mb-2">
          Conversando com <span className="text-blue-600">{selectedUser.name}</span>
        </h2>
      )}

      <div className="border p-2 rounded h-64 overflow-y-auto bg-gray-50 mb-4">
        {selectedUser ? (
          messages.length > 0 ? (
            messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 flex ${msg.senderId === loggedUser?.id ? 'justify-end' : 'justify-start'}`}>
                <span
                  className={`px-3 py-1 rounded-lg ${
                    msg.senderId === loggedUser?.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma mensagem ainda</p>
          )
        ) : (
          <p className="text-gray-500">Selecione um usuário para começar a conversar</p>
        )}
      </div>

      {selectedUser && (
        <div className="flex gap-2">
          <input type="text" className="flex-1 border p-2 rounded" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
          <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded" disabled={!newMessage.trim()}>
            Enviar
          </button>
        </div>
      )}
    </main>
  );
}
