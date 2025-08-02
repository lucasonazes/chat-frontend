import { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { IoSend } from 'react-icons/io5';
import { GrFormAttachment } from 'react-icons/gr';
import AttachMenu from './AttachMenu';

interface InputProps {
  onSend: (msg: string) => void;
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

  const onEmojiClick = (emoji: EmojiClickData) => {
    setMessage((prev) => prev + emoji.native);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <div className="flex items-center gap-2 relative">
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => setShowPicker((prev) => !prev)}
          className="text-2xl hover:bg-selected cursor-pointer rounded-3xl p-1"
        >
          😀
        </button>
        <button onClick={() => setShowAttachments((prev) => !prev)} className="text-3xl hover:bg-selected cursor-pointer rounded-3xl p-1">
          <GrFormAttachment />
        </button>
      </div>

      {showPicker && (
        <div className="absolute bottom-12 left-0 z-10">
          <Picker data={data} onEmojiSelect={onEmojiClick} />
        </div>
      )}

      {showAttachments && (
        <AttachMenu
          isOpen={showAttachments}
          onClose={() => setShowAttachments(false)}
          onSelect={(action) => console.log('Selecionado:', action)}
        />
      )}

      <input type="text" className="flex-1 border p-2 rounded-2xl" value={message} onChange={(e) => setMessage(e.target.value)} />

      <button onClick={sendMessage} className="bg-primary text-white px-3 py-3 rounded-3xl text-xl cursor-pointer">
        <IoSend />
      </button>
    </div>
  );
}
