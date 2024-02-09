// import httpClient from '@mica/utils/httpClient';
import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import financeApi from '../api/financeApi';
import { useUserContext } from '../context/UserContext';

export function useUser() {
  const { setUser } = useUserContext();
  return useQuery(['user'], async () => {
    const userId: any = await AsyncStorage.getItem('user_id');
    const id = JSON.parse(userId);
    try {
      const data = await financeApi.get(`/api/v1/users/${id}`);
      console.log(data?.data);
      setUser(data?.data);
      return data?.data;
    } catch (e: any) {
      console.log('error getUser', e.response);
    }
  });
}
