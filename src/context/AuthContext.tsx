import React, {createContext, useEffect, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authReducer, AuthState} from './authReducer';
import {Alert} from 'react-native';
import {useErrorsContext} from './ErrorsContext';
import authApi from '../api/authApi';
import {useUserContext} from './UserContext';
import {useSearchContext} from './SearchContext';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: any;
  status: 'checking' | 'authenticated' | 'not-authenticated' | 'registered';
  signUp: (loginData: any) => void;
  signIn: (loginData: any) => void;
  logOut: () => void;
  removeError: () => void;
  isLoading: boolean;
};

const authInicialState: AuthState = {
  status: 'checking',
  token: null,
  refresh_token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const {setUser, setIsFirstUser} = useUserContext();
  const {setIsSearch, setSearch} = useSearchContext();
  const [state, dispatch] = useReducer(authReducer, authInicialState);
  const [isLoading, setIsLoading] = useState(false);
  const {setErrors} = useErrorsContext();

  useEffect(() => {
    if (state.status === 'not-authenticated') {
      return;
    }
    checkToken();
  }, [state]);

  const checkToken = async () => {
    const token: any = await AsyncStorage.getItem('token');
    const expires_at: any = await AsyncStorage.getItem('expires_at');
    const refresh_token: any = await AsyncStorage.getItem('refresh_token');
    const user: any = await AsyncStorage.getItem('user');

    if (!token || !expires_at || !refresh_token) {
      return dispatch({type: 'notAuthenticated'});
    }
    dispatch({
      type: 'signIn',
      payload: {
        token,
        refresh_token,
        user,
      },
    });
  };

  const signUp = async (info: any) => {
    const {
      name,
      last_name,
      cellphone_number,
      email,
      password,
      team_size,
      contracts_per_month,
      work_location_state,
      cellphone_number_prefix,
    } = info;
    setIsLoading(true);

    try {
      await authApi.post<any>('/api/v2/brokers', {
        user_attributes: {
          name,
          last_name,
          cellphone_number,
          cellphone_number_prefix,
          email,
          password,
          broker_profile_attributes: {
            team_size,
            contracts_per_month,
            work_location_state,
          },
        },
      });
      dispatch({
        type: 'signUp',
        payload: 'Registro exitoso',
      });
      setErrors([]);
      await signIn({
        username: email,
        password,
      });
    } catch (error: any) {
      console.log('error?.response.data.errors', error?.response.data.errors);
      Alert.alert('Error😔', error?.response.data.errors?.[0].detail);
      setIsLoading(false);
      setErrors(error.response.data.errors);
    }
  };

  const signIn = async (info: any) => {
    const {username, password} = info;
    setIsLoading(true);
    try {
      const response = await authApi.post<any>('/oauth/token', {
        username: username,
        password: password,
        grant_type: 'password',
        role: 'broker',
      });
      const data = response?.data;
      await AsyncStorage.setItem('token', data?.access_token);
      await AsyncStorage.setItem(
        'expires_at',
        JSON.stringify(data?.expires_at),
      );
      await AsyncStorage.setItem('refresh_token', data?.refresh_token);
      await AsyncStorage.setItem('user', JSON.stringify(data?.user));
      setUser(data?.user);
      setIsFirstUser(data?.first_login);
      dispatch({
        type: 'signIn',
        payload: {
          token: data?.access_token,
          user: data?.user,
          refresh_token: data?.refresh_token,
        },
      });

      setIsLoading(false);
    } catch (error: any) {
      console.log('_______error_______', error);

      setIsLoading(false);
      console.log(error?.response.data.errors);
      setErrors(error.response.data.errors);
      Alert.alert('Error login', error.response.data.errors[0].detail);
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('expires_at');
    await AsyncStorage.removeItem('refresh_token');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('pressed');
    setIsSearch(null);
    dispatch({type: 'logout'});
    setUser(null);
    setSearch(null);
  };

  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
