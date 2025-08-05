import { IMessage } from '@/types/message';
import Image from 'next/image';
import Link from 'next/link';

export default function MessageBubble({ msg, isMine }: { msg: IMessage; isMine: boolean }) {
  const renderContent = () => {
    if (msg.fileUrl) {
      if (msg.fileType?.startsWith('image')) {
        return <Image src={msg.fileUrl} width={300} height={300} alt='image' className='max-w-[200px] md:max-w-[300px] rounded-lg cursor-pointer hover:opacity-90' />;
      }
      if (msg.fileType === 'application/pdf') {
        return (
          <Link href={msg.fileUrl} target='_blank' rel='noopener noreferrer' className='text-primary underline font-semibold'>
            Open PDF 📄
          </Link>
        );
      }
      return (
        <Link href={msg.fileUrl} target='_blank' rel='noopener noreferrer' className='text-primary underline font-semibold'>
          Download file 📎
        </Link>
      );
    }

    return (
      <span className={`px-3 py-1 rounded-lg ${isMine ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-900'}`}>{msg.content}</span>
    );
  };

  return (
    <div className={`mb-2 flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className='flex flex-col w-fit'>
        {renderContent()}
        <span className='text-xs text-gray-500 mt-1 self-end'>{`${new Date(msg.createdAt).toLocaleDateString()} ${new Date(msg.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`}</span>
      </div>
    </div>
  );
}
