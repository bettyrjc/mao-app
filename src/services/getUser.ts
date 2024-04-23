import AsyncStorage from '@react-native-async-storage/async-storage';
import financeApi from '../api/financeApi';
// import { useUserContext } from '../context/UserContext';

export const getUser = async () => {
  // const { setUser } = useUserContext();
  //todo: checked it

  const userId: any = await AsyncStorage.getItem('user_id');
  const id = JSON.parse(userId);
  try {
    const data = await financeApi.get(`/api/v1/users/${id}`);
    // setUser(data);
    return data.data;
  } catch (e: any) {
    console.error('error getUser', e.response);
  }
};
