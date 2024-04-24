/* eslint-disable @typescript-eslint/no-shadow */
import React, { createContext, FC, ReactNode, useContext, useState } from 'react';

type Error = {
  detail: string;
  source?: string;
};

type ErrorsContextProps = {
  error: Record<any, any>;
  setErrors: (errorList: Error[]) => void;
};

const ErrorsContext = createContext<ErrorsContextProps | undefined>(undefined);

export function useErrorsContext() {
  const context = useContext(ErrorsContext);

  if (!context) {
    throw new Error('Error en el contexto de errores');
  }

  return context;
}

export const ErrorsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<Record<any, any>>({});

  const setErrors = (errorArray: Error[]) => {
    const errorObject: Record<any, any> = errorArray.reduce((acc: any, error: any) => {
      if (error.source) {
        acc[error.source] = error.msg;
      }

      return acc;
    }, {});

    setError(errorObject);
  };

  return <ErrorsContext.Provider value={{ error, setErrors }}>{children}</ErrorsContext.Provider>;
};
