'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaRegImage, FaCamera, FaFileAlt, FaUser } from 'react-icons/fa';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (action: string) => void;
}

export default function AttachMenu({ isOpen, onClose, onSelect }: Props) {
  const options = [
    { label: 'Document', icon: <FaFileAlt />, color: 'bg-blue-500', action: 'document' },
    { label: 'Camera', icon: <FaCamera />, color: 'bg-pink-500', action: 'camera' },
    { label: 'Galery', icon: <FaRegImage />, color: 'bg-purple-500', action: 'gallery' },
    { label: 'Contact', icon: <FaUser />, color: 'bg-green-500', action: 'contact' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-9" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 left-0 z-10 bg-white dark:bg-[#1e1e1e] shadow-lg rounded-xl p-3 flex flex-col gap-4"
          >
            {options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  onSelect(opt.action);
                  onClose();
                }}
                className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition"
              >
                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${opt.color}`}>{opt.icon}</div>
                <span className="text-sm">{opt.label}</span>
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
