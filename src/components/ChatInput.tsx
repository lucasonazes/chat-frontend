import { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface InputProps {
  onSend: (msg: string) => void;
}

export default function ChatInput({ onSend }: InputProps) {
  const [message, setMessage] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <div className="flex items-center gap-2 relative">
      <button type="button" onClick={() => setShowPicker((prev) => !prev)} className="text-2xl">
        😀
      </button>

      {showPicker && (
        <div className="absolute bottom-12 left-0 z-10">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}

      <input type="text" className="flex-1 border p-2 rounded" value={message} onChange={(e) => setMessage(e.target.value)} />

      <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
        Enviar
      </button>
    </div>
  );
}
