import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { authService } from '../services/authService';

export const useLogin = () => {
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const res = await authService.login(email, password);
      const token = res.data.token;
      localStorage.setItem('token', token);

      toast.success('Welcome!');
      router.push('/');
    } catch {
      toast.error('Login failed');
    }
  };

  return { login };
};
