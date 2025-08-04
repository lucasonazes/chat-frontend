'use client';

import { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useLogin();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('All fields are required');
    }

    await login(email, password);
  };

  return (
    <main className="p-10 mx-auto w-fit max-w-[1200px] flex items-start h-screen">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">Sign In</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              autoComplete="email"
              type="email"
              placeholder="E-mail"
              required
              className="border p-2 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              autoComplete="current-password"
              type="password"
              placeholder="Password"
              required
              className="border p-2 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-xl cursor-pointer font-bold">
              Sign in
            </button>
          </form>
          <button className="mt-7  tracking-wide" onClick={() => router.push('/register')}>
            <span>
              Don&apos;t have an account? <strong>Sign up</strong>
            </span>
          </button>
        </div>
        <div className="md:w-1/2">
          <Image priority alt="Hero" src="/sign-in.png" width={800} height={600} className="object-cover h-full" />
        </div>
      </div>
    </main>
  );
}
