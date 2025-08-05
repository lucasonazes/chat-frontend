import { IUser } from '@/types/user';
import useIsMobile from '@/hooks/isMobile';

interface Props {
  users: IUser[];
  loggedUser: IUser | null;
  selectedContact: IUser | null;
  onSelect: (user: IUser) => void;
}

export default function ContactsList({ users, loggedUser, selectedContact, onSelect }: Props) {
  const isMobile = useIsMobile();

  return (
    <section className='w-full md:w-2/4 lg:w-1/3'>
      <h2 className='text-lg font-semibold mb-2'>Contacts:</h2>
      <div className='relative'>
        <div className={`flex flex-col gap-2 ${isMobile ? 'overflow-y-auto max-h-[160px]' : ''}`}>
          {users
            .filter((u) => u.id !== loggedUser?.id)
            .map((user) => (
              <button
                key={user.id}
                className={`px-2 py-2 rounded-xl border cursor-pointer ${
                  selectedContact?.id === user.id ? 'bg-selected text-white' : 'hover:bg-selected hover:text-white'
                }`}
                onClick={() => onSelect(user)}
              >
                {user.name}
              </button>
            ))}
          {users.length === 0 && <p className='text-gray-500'>No users found</p>}
        </div>

        {isMobile && users.length > 4 && (
          <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent' />
        )}
      </div>
    </section>
  );
}
