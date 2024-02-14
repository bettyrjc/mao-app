import Config from 'react-native-config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  console.log('token in api', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agrega el token a la cabecera de la solicitud
  }

  return config;
});

financeApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token'); // Obtén el token almacenado

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agrega el token a la cabecera de la solicitud
  }

  return config;
});

financeApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    // if (error.response && error.response.status === 401 && !error.config._retry) {
    //   error.config._retry = true; // Marca la solicitud original para evitar bucles infinitos
    //   // const refreshTokenValue = await AsyncStorage.getItem('refresh_token');
    //   await AsyncStorage.removeItem('token');
    //   await AsyncStorage.removeItem('expires_at');
    //   await AsyncStorage.removeItem('refresh_token');
    //   await AsyncStorage.removeItem('user');
    //   return Promise.reject(error);
    //   // if (refreshTokenValue) {
    //   //   // Llama a la función refreshToken para obtener un nuevo token
    //   //   const refreshedTokens = await refreshToken(refreshTokenValue);
    //   //   if (refreshedTokens.success) {
    //   //     // Actualiza los tokens y repite la solicitud original con los nuevos tokens
    //   //     await AsyncStorage.setItem('token', refreshedTokens.access_token);
    //   //     await AsyncStorage.setItem('expires_at', JSON.stringify(refreshedTokens.expires_at));
    //   //     error.config.headers.Authorization = `Bearer ${refreshedTokens.access_token}`;

    //   //     return axios(error.config);
    //   //   } else {
    //   //     // Si no se pudo obtener un nuevo token, se destruye la sesión

    //   //   }
    //   // }
    // }
    console.error('error', error);
    return Promise.reject(error);
  }
);

export default financeApi;
