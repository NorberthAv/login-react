import { createContext, useState , useEffect  } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [Session, setSession] = useState([]);
  
  const updateGlobalVariable = (newValues) => {
    setSession([...Session, ...newValues]);
    localStorage.setItem('Session', JSON.stringify([...Session, ...newValues]));
  };

  useEffect(() => {
    const storedSession = localStorage.getItem('Session');
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    }
  }, []);



  return (
    <GlobalContext.Provider value={{ Session, updateGlobalVariable }}>
      {children}
    </GlobalContext.Provider>
  );
};