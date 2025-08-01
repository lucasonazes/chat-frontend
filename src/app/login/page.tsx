'use client';

import { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useLogin();

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className="flex flex-col gap-4">
        <input type="email" placeholder="E-mail" className="border p-2 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => login(email, password)} className="bg-primary text-white px-4 py-2 rounded-xl cursor-pointer">
          Login
        </button>
      </div>
    </main>
  );
}
