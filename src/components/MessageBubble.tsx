import { IMessage } from '@/types/message';

export default function MessageBubble({
  msg,
  isMine,
}: {
  msg: IMessage;
  isMine: boolean;
}) {
  return (
    <div className={`mb-2 flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <span
        className={`px-3 py-1 rounded-lg ${
          isMine ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
        }`}
      >
        {msg.content}
      </span>
    </div>
  );
}
