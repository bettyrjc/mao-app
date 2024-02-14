import AsyncStorage from '@react-native-async-storage/async-storage';
import financeApi from '../api/financeApi';
import { useUserContext } from './UserContext';

export const getUser = async () => {
  const { setUser } = useUserContext();

  const userId: any = await AsyncStorage.getItem('user_id');
  const id = JSON.parse(userId);
  console.log('userId', `/api/v1/users/${id}`);
  console.log('userId', id);
  try {
    const data = await financeApi.get(`/api/v1/users/${id}`);
    setUser(data);
    return data.data;
  } catch (e: any) {
    console.log('error getUser', e.response);
  }
};
