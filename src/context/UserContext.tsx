import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

const UserContext = createContext<any>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('Error en el contexto de usuarios');
  }

  return context;
}

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isFirstUser, setIsFirstUser] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      setIsLoadingUser(true);
      try {
        const userStorage: any = await AsyncStorage.getItem('user');
        const parserUser = JSON.parse(userStorage);
        setUser(parserUser);
        setIsLoadingUser(false);
      } catch (error) {
        setIsLoadingUser(false);

        console.error('Error al obtener el usuario:', error);
      }
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoadingUser, setUser, setIsFirstUser, isFirstUser }}>
      {children}
    </UserContext.Provider>
  );
};
