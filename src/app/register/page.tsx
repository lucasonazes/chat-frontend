'use client';

import { useState } from 'react';
import { useRegister } from '@/hooks/useRegister';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { register } = useRegister();

  const handleSubmit = () => {
    if (!name || !email || !password || !repeatPassword) {
      return toast.error('All fields are required');
    }
    if (password !== repeatPassword) return toast.error('Passwords must be the same');

    register(name, email, password);
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <div className="flex flex-col gap-4">
        <input
          required
          type="text"
          placeholder="Name"
          className="border p-2 rounded-xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="E-mail"
          className="border p-2 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="border p-2 rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Repeat Password"
          className="border p-2 rounded-xl"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button onClick={handleSubmit} className="bg-primary text-white px-4 py-2 rounded-xl cursor-pointer font-bold">
          Register
        </button>
      </div>
    </main>
  );
}
