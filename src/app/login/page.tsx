'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${URL}/users/login`, {
        email,
        password
      });

      const token = res.data.token;
      localStorage.setItem('token', token);

      toast.success('Welcome!');
      router.push('/');
    } catch {
      toast.error('Login failed');
    }
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome</h1>
      <div className="flex flex-col gap-4">
        <input type="email" placeholder="E-mail" className="border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </div>
    </main>
  );
}
