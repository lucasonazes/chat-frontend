import { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { IoSend } from 'react-icons/io5';

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

  const onEmojiClick = (emoji: EmojiClickData ) => {
    setMessage((prev) => prev + emoji.native);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <div className="flex items-center gap-2 relative">
      <button type="button" onClick={() => setShowPicker((prev) => !prev)} className="text-2xl hover:bg-selected cursor-pointer rounded-3xl p-1">
        😀
      </button>

      {showPicker && (
        <div className="absolute bottom-12 left-0 z-10">
          <Picker data={data} onEmojiSelect={onEmojiClick} />
        </div>
      )}

      <input type="text" className="flex-1 border p-2 rounded-2xl" value={message} onChange={(e) => setMessage(e.target.value)} />

      <button onClick={sendMessage} className="bg-primary text-white px-3 py-3 rounded-3xl text-xl cursor-pointer">
        <IoSend />
      </button>
    </div>
  );
}
