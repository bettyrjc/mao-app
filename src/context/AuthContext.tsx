/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authReducer, AuthState } from './authReducer';
import { Alert } from 'react-native';
import { useErrorsContext } from './ErrorsContext';
import authApi from '../api/authApi';
import { useUserContext } from './UserContext';
import financeApi from '../api/financeApi';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user_id: any;
  status: 'checking' | 'authenticated' | 'not-authenticated' | 'registered';
  signUp: (loginData: any) => void;
  signIn: (loginData: any) => void;
  logOut: () => void;
  removeError: () => void;
  isLoading: boolean;
  isLoadingUser: boolean;
};

export const authInicialState: AuthState = {
  status: 'not-authenticated',
  token: null,
  user_id: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const { setUser } = useUserContext();
  const [state, dispatch] = useReducer(authReducer, authInicialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const { setErrors } = useErrorsContext();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const user_id = await AsyncStorage.getItem('user_id');
        if (token && user_id) {
          dispatch({
            type: 'signIn',
            payload: {
              token,
              user_id: JSON.parse(user_id),
            },
          });
          getUser(JSON.parse(user_id));
        } else {
          dispatch({ type: 'notAuthenticated' });
        }
      } catch (error) {
        console.error('Error retrieving authentication state:', error);
      }
    };

    checkAuthentication();
  }, []);

  const signUp = async (info: any) => {
    const { name, last_name, email, pronoun, password, id } = info;

    setIsLoading(true);
    try {
      await authApi.post<any>('/api/v1/sign-up', {
        id,
        name,
        last_name,
        email,
        password,
        pronoun,
      });
      dispatch({
        type: 'signUp',
        payload: 'Registro exitoso',
      });
      await signIn({
        username: email,
        password,
      });
    } catch (error: any) {
      console.error('error?.response.data.errors', error?.response);
      Alert.alert('Error login', error?.response.data?.detail?.[0]?.msg);
      setErrors(error.response.data?.detail);
      setIsLoading(false);
    }
  };

  const getUser = async (id: string) => {
    setIsLoadingUser(true);
    try {
      const data = await financeApi.get(`/api/v1/users/${id}`);
      setUser(data);
      await AsyncStorage.setItem('data', JSON.stringify(data));
      setIsLoadingUser(false);
      return data;
    } catch (e: any) {
      setIsLoadingUser(false);
      console.error('error getUser', e.response);
    }
  };

  const signIn = async (info: any) => {
    const { username, password } = info;
    setIsLoading(true);
    try {
      const response = await authApi.post<any>('/api/v1/sign-in', {
        username: username,
        password: password,
        grant_type: 'password',
      });
      const data = response?.data;
      await AsyncStorage.setItem('token', data?.access_token);
      await AsyncStorage.setItem('refresh_token', data?.refresh_token);
      await AsyncStorage.setItem('expires_at', JSON.stringify(data?.expires_at));
      await AsyncStorage.setItem('user_id', JSON.stringify(data?.user_id));
      dispatch({
        type: 'signIn',
        payload: {
          token: data?.access_token,
          user_id: data?.user_id,
        },
      });
      getUser(data?.user_id);
      setIsLoading(false);
    } catch (error: any) {
      console.error('error?.response.data.errors', error?.response.data?.detail);
      setErrors(error.response.data?.detail);
      Alert.alert('Error login', error?.response.data?.detail?.[0]?.msg);
      setIsLoading(false);
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('expires_at');
    await AsyncStorage.removeItem('user_id');
    dispatch({ type: 'logout' });
    setUser(null);
  };

  const removeError = () => {
    dispatch({ type: 'removeError' });
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
        isLoadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
