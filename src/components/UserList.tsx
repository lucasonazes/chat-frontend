import { IUser } from '@/types/user';

interface Props {
  users: IUser[];
  loggedUser: IUser | null;
  selectedContact: IUser | null;
  onSelect: (user: IUser) => void;
}

export default function UserList({ users, loggedUser, selectedContact, onSelect }: Props) {
  return (
    <section className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Usuários:</h2>
      <div className="flex flex-wrap gap-2">
        {users
          .filter((u) => u.id !== loggedUser?.id)
          .map((user) => (
            <button
              key={user.id}
              className={`px-2 py-1 rounded border ${selectedContact?.id === user.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => onSelect(user)}
            >
              {user.name}
            </button>
          ))}
        {users.length === 0 && <p className="text-gray-500">Nenhum usuário encontrado</p>}
      </div>
    </section>
  );
}
