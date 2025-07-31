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
    <div className='w-full md:w-2/4 lg:w-2/3 flex flex-col h-[80vh] max-h-screen'>
      <h2 className="text-md font-medium mb-2">
        Talking with <span className="text-primary font-bold">{selectedContact.name}</span>
      </h2>

      <div className="border p-2 rounded h-full overflow-y-auto bg-gray-50 mb-4">
        {messages.length > 0 ? (
          messages.map((msg, idx) => <MessageBubble key={idx} msg={msg} isMine={msg.senderId === loggedUser?.id} />)
        ) : (
          <p className="text-gray-500">No messages found</p>
        )}
      </div>

      <ChatInput onSend={onSend} />
    </div>
  );
}
