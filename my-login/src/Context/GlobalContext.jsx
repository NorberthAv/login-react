import { createContext, useState , useEffect  } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Detallados} from '../components/detallado/Detalle'
import App from '../App';


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