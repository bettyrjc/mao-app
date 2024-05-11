import Config from 'react-native-config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authApi from './authApi';

const getApiUrl = () => {
  return Config.API_URL;
};

const financeApi = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

financeApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token'); // Obtén el token almacenado
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agrega el token a la cabecera de la solicitud
  }
  return config;
});

financeApi.interceptors.response.use(
  async (response) => {
    return response.data;
  },
  async (error) => {
    console.log('error in token', error.response);
    console.log('error in token status', error.response.status);
    if (error.response && error.response.status === 401 && !error.config._retry) {
      error.config._retry = true; // Marca la solicitud original para evitar bucles infinitos
      const refreshTokenValue = await AsyncStorage.getItem('refresh_token');
      const tokenValue = await AsyncStorage.getItem('token');
      console.log('tokenValue in token', tokenValue);
      console.log('refreshTokenValue in token', refreshTokenValue);

      if (refreshTokenValue) {
        console.log('entroo!!!');
        // Llama a la función refreshToken para obtener un nuevo token
        await authApi
          .post<any>('/api/v1/sign-in', {
            access_token: tokenValue,
            refresh_token: refreshTokenValue,
            grant_type: 'refresh_token',
          })
          .then((response) => {
            console.log('response', response);
          })
          .catch((e) => {
            console.log('error in refresh token', e);
          });
        // if (refreshedTokens.success) {
        //   // Actualiza los tokens y repite la solicitud original con los nuevos tokens
        //   await AsyncStorage.setItem('token', refreshedTokens.access_token);
        //   await AsyncStorage.setItem('expires_at', JSON.stringify(refreshedTokens.expires_at));
        //   error.config.headers.Authorization = `Bearer ${refreshedTokens.access_token}`;

        //   return axios(error.config);
        // } else {
        //   // Si no se pudo obtener un nuevo token, se destruye la sesión
        //   await AsyncStorage.removeItem('token');
        //   await AsyncStorage.removeItem('expires_at');
        //   await AsyncStorage.removeItem('user_id');
        //   await AsyncStorage.removeItem('data');
        // }
      }
    }
    console.error('error in token', error);
    return Promise.reject(error);
  }
);

export default financeApi;
