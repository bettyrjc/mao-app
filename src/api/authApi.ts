import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseURLDev = Config.API_URL_DEV;
// const baseURLProd = Config.API_URL_PROD;
// const DEV = Config.DEV;
// const baseURL = DEV === 'true' ? baseURLDev : baseURLProd;
// const authApi = axios.create({baseURL});
const baseURL = Config.API_URL;
const authApi = axios.create({ baseURL });

authApi.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['x-token'] = token;
    }
  } catch (error) {
    console.error('error_parent', error);
  }
  return config;
});

export default authApi;
