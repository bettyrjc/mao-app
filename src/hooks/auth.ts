import { useMutation, useQueryClient } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authApi from '../api/authApi';

export const AuthProvider = ({ children }: any) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);
  // Resto del código...

  const signUpMutation = useMutation((info: any) => authApi.post<any>('/api/v1/sign-up', info));
  const signInMutation = useMutation((info: any) => authApi.post<any>('/api/v1/sign-in', info), {
    onSuccess: async (data: any) => {
      await AsyncStorage.setItem('token', data.access_token);
      await AsyncStorage.setItem('expires_at', JSON.stringify(data.expires_at));
      await AsyncStorage.setItem('user_id', JSON.stringify(data.user_id));
    },
  });

  // Resto del código...

  const signUp = async (info: any) => {
    setIsLoading(true);
    try {
      await signUpMutation.mutateAsync(info);
      setIsLoading(false);
    } catch (error) {
      // Manejo de errores
    }
  };

  const signIn = async (info: any) => {
    setIsLoading(true);
    try {
      await signInMutation.mutateAsync(info);
      setIsLoading(false);
    } catch (error) {
      // Manejo de errores
    }
  };

  // Resto del código...
};
