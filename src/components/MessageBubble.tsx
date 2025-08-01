import { IMessage } from '@/types/message';

export default function MessageBubble({ msg, isMine }: { msg: IMessage; isMine: boolean }) {
  return (
    <div className={`mb-2 flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className='flex flex-col w-fit'>
        <span className={`px-3 py-1 rounded-lg ${isMine ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-900'}`}>{msg.content}</span>
        <span className="text-xs text-gray-500 mt-1 self-end">{`${new Date(msg.createdAt).toLocaleDateString()} ${new Date(msg.createdAt).toLocaleTimeString('pt-BR',{ hour: '2-digit', minute: '2-digit' })}`}</span>
      </div>
    </div>
  );
}
