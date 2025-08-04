'use client';

import { useCallback, useEffect, useState } from 'react';
import { IUser } from '@/types/user';
import { IMessage } from '@/types/message';
import { userService } from '@/services/userService';
import { messageService } from '@/services/messageService';
import { useSocket } from '@/hooks/useSocket';
import ChatWindow from '@/components/ChatWindow';
import ContactsList from '@/components/ContactsList';
import Loading from './Loading';
import { IoLogOut } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { resetSocket } from '@/lib/socket';

export default function ChatContainer() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedContact, setSelectedContact] = useState<IUser | null>(null);
  const [loggedUser, setLoggedUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const userRes = await userService.getAll();
        setUsers(userRes.data);

        const meRes = await userService.getMe();
        setLoggedUser(meRes.data);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const handleMessage = useCallback(
    (message: IMessage) => {
      if (selectedContact && (message.senderId === selectedContact.id || message.receiverId === selectedContact.id)) {
        setMessages((prev) => [...prev, message]);
      }
    },
    [selectedContact]
  );

  const socket = useSocket(loggedUser?.id || null, token, handleMessage);

  useEffect(() => {
    if (!loggedUser || !selectedContact) return;
    setMessages([]);
    setIsLoadingMessages(true);

    const fetchMessages = async () => {
      try {
        const res = await messageService.getConversation(loggedUser.id, selectedContact.id);
        setMessages(res.data);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [loggedUser, selectedContact]);

  const sendMessage = (content: string) => {
    if (!selectedContact || !content.trim()) return;
    socket?.emit('sendMessage', { content, receiverId: selectedContact.id });
  };

  const handleLogout = () => {
    resetSocket();
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <main className="p-2 md:p-6 max-w-7xl m-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Chat de <span className='text-primary'>{loggedUser?.name}</span></h1>
        <button onClick={handleLogout} className="text-icon text-4xl cursor-pointer">
          <IoLogOut />
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 max-w-full">
        {isLoadingUsers ? (
          <Loading />
        ) : (
          <ContactsList users={users} loggedUser={loggedUser} selectedContact={selectedContact} onSelect={setSelectedContact} />
        )}

        {selectedContact &&
          (isLoadingMessages ? (
            <Loading />
          ) : (
            <ChatWindow messages={messages} loggedUser={loggedUser} selectedContact={selectedContact} onSend={sendMessage} />
          ))}
      </div>
    </main>
  );
}
