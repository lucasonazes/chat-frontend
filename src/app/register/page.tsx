'use client';

import { useState } from 'react';
import { useRegister } from '@/hooks/useRegister';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { register } = useRegister();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !repeatPassword) {
      return toast.error('All fields are required');
    }
    if (password !== repeatPassword) return toast.error('Passwords must be the same');

    register(name, email, password);
  };

  return (
    <main className="p-10 mx-auto w-fit max-w-[1200px] flex items-start h-screen">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">Create Account</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              autoComplete="email"
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
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-xl cursor-pointer font-bold">
              Sign Up
            </button>
          </form>
          <button className="mt-7 tracking-wide" onClick={() => router.push('/login')}>
            <span>Already have an account? <strong>Sign in</strong></span>
          </button>
        </div>
        <div className="md:w-1/2">
          <Image priority alt="Hero" src="/sign-up.png" width={800} height={60} className="object-cover h-full" />
        </div>
      </div>
    </main>
  );
}
