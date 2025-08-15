import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { authService } from '../services/authService';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/authSlice';

export const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    try {
      const res = await authService.login(email, password);
      const token = res.data.token;
      dispatch(setToken(token));

      toast.success('Welcome!');
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return { login };
};
