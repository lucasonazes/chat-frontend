import { IMessage } from '@/types/message';
import { IUser } from '@/types/user';
import { useState } from 'react';
import MessageBubble from './MessageBubble';

interface Props {
  messages: IMessage[];
  loggedUser: IUser | null;
  selectedContact: IUser;
  onSend: (content: string) => void;
}

export default function ChatWindow({ messages, loggedUser, selectedContact, onSend }: Props) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    onSend(newMessage);
    setNewMessage('');
  };

  return (
    <>
      <h2 className="text-md font-medium mb-2">
        Conversando com <span className="text-blue-600">{selectedContact.name}</span>
      </h2>

      <div className="border p-2 rounded h-64 overflow-y-auto bg-gray-50 mb-4">
        {messages.length > 0 ? (
          messages.map((msg, idx) => <MessageBubble key={idx} msg={msg} isMine={msg.senderId === loggedUser?.id} />)
        ) : (
          <p className="text-gray-500">Nenhuma mensagem ainda</p>
        )}
      </div>

      <div className="flex gap-2">
        <input type="text" className="flex-1 border p-2 rounded" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded" disabled={!newMessage.trim()}>
          Enviar
        </button>
      </div>
    </>
  );
}
