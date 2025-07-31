import { IMessage } from '@/types/message';
import { IUser } from '@/types/user';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

interface Props {
  messages: IMessage[];
  loggedUser: IUser | null;
  selectedContact: IUser;
  onSend: (content: string) => void;
}

export default function ChatWindow({ messages, loggedUser, selectedContact, onSend }: Props) {
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

      <ChatInput onSend={onSend} />
    </>
  );
}
