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

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
