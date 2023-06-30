import { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [Session, setSession] = useState([]);

  const updateGlobalVariable = (newValue) => {
    setSession(newValue);
  };

  return (
    <GlobalContext.Provider value={{ Session, updateGlobalVariable }}>
      {children}
    </GlobalContext.Provider>
  );
};