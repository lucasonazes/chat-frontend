'use client';

import { useCallback, useEffect, useState } from 'react';
import { IUser } from '@/types/user';
import { IMessage } from '@/types/message';
import { userService } from '@/services/userService';
import { messageService } from '@/services/messageService';
import { useSocket } from '@/hooks/useSocket';
import ChatWindow from '@/components/ChatWindow';
import UserList from '@/components/UserList';

export default function ChatContainer() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedContact, setSelectedContact] = useState<IUser | null>(null);
  const [loggedUser, setLoggedUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const userRes = await userService.getAll();
      setUsers(userRes.data);

      const meRes = await userService.getMe();
      setLoggedUser(meRes.data);
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

    const fetchMessages = async () => {
      const res = await messageService.getConversation(loggedUser.id, selectedContact.id);
      setMessages(res.data);
    };

    fetchMessages();
  }, [loggedUser, selectedContact]);

  const sendMessage = (content: string) => {
    if (!selectedContact || !content.trim()) return;
    socket?.emit('sendMessage', { content, receiverId: selectedContact.id });
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <UserList users={users} loggedUser={loggedUser} selectedContact={selectedContact} onSelect={setSelectedContact} />
      {selectedContact && <ChatWindow messages={messages} loggedUser={loggedUser} selectedContact={selectedContact} onSend={sendMessage} />}
    </main>
  );
}
