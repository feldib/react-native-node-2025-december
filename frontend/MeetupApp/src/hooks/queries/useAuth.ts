import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { loginUser, registerUser } from '@/fetching/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  description?: string;
}

export const useLoginMutation = () => {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return await loginUser(credentials.email, credentials.password);
    },
    onSuccess: data => {
      setAuth(data.user);
    },
  });
};

export const useRegisterMutation = () => {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: async (userData: RegisterData) => {
      return await registerUser(userData);
    },
    onSuccess: data => {
      setAuth(data.user);
    },
  });
};
