import { useRef, useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { IoSend } from 'react-icons/io5';
import { GrFormAttachment } from 'react-icons/gr';
import AttachMenu from './AttachMenu';
import useIsMobile from '@/hooks/isMobile';
import AttachPreview from './AttachPreview';

interface InputProps {
  onSend: (msg: string, file?: File) => void;
}

type EmojiClickData = {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
};

export default function ChatInput({ onSend }: InputProps) {
  const [message, setMessage] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [file, setFile] = useState<File>();
  const isMobile = useIsMobile();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onEmojiClick = (emoji: EmojiClickData) => {
    setMessage((prev) => prev + emoji.native);
  };

  const sendMessage = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
    if (file) {
      onSend('', file);
      setFile(undefined);
    }
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleAttachment = (action: string) => {
    if (action === 'gallery' || action === 'document') {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
    setMessage('');
    e.target.value = '';
  };

  return (
    <div className='flex flex-col gap-2'>
      {file && isMobile && <AttachPreview file={file} onClose={() => setFile(undefined)} />}
      <div className='flex items-center gap-2 relative'>
        {file && !isMobile && <AttachPreview file={file} onClose={() => setFile(undefined)} />}

        <div className='flex gap-1'>
          <button
            type='button'
            onClick={() => setShowPicker((prev) => !prev)}
            className='text-2xl hover:bg-selected cursor-pointer rounded-3xl p-1'
          >
            😀
          </button>
          <button
            onClick={() => setShowAttachments((prev) => !prev)}
            className='text-3xl hover:bg-selected hover:text-white cursor-pointer rounded-3xl p-1'
          >
            <GrFormAttachment />
          </button>
        </div>

        {showPicker && (
          <div className='absolute bottom-12 left-0 z-10'>
            <Picker data={data} onEmojiSelect={onEmojiClick} />
          </div>
        )}

        {showAttachments && <AttachMenu isOpen={showAttachments} onClose={() => setShowAttachments(false)} onSelect={handleAttachment} />}

        <input ref={fileInputRef} type='file' accept='image/*,application/pdf' className='hidden' onChange={handleFileChange}></input>

        <input
          type='text'
          onKeyDown={handleEnter}
          disabled={!!file}
          className='flex-1 border p-2 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage} className='bg-primary text-white px-3 py-3 rounded-3xl text-xl cursor-pointer'>
          <IoSend />
        </button>
      </div>
    </div>
  );
}
