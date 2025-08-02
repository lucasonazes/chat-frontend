import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export const useRegister = () => {
  const router = useRouter();

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await authService.register(name, email, password);
      const token = res.data.token;
      localStorage.setItem('token', token);

      toast.success(`Account created. Welcome, ${name}!`);
      router.push('/');
    } catch {
      toast.error('Error creating account');
    }
  };

  return { register };
};
