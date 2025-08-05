import Image from 'next/image';
import { MdClose } from 'react-icons/md';

interface Props {
  file: File;
  onClose: () => void;
}

export default function AttachPreview({ file, onClose }: Props) {
  return (
    <div className='flex items-center gap-3 p-2 border rounded-xl bg-gray-100 dark:bg-gray-800'>
      {file.type.startsWith('image/') ? (
        <Image src={URL.createObjectURL(file)} width={16} height={16} alt='preview' className='w-16 h-16 object-cover rounded-lg' />
      ) : (
        <span className='text-sm font-medium'>{file.name}</span>
      )}
      <button onClick={onClose} className='text-red-500 hover:text-red-700 text-xl'>
        <MdClose />
      </button>
    </div>
  );
}
