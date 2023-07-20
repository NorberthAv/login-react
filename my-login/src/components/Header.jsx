import { createContext, useState, useContext  , useEffect  } from 'react';
import { GlobalContext } from './../Context/GlobalContext';
import logo from './../logo.svg';



export function Header() {

    const { Session, updateGlobalVariable } = useContext(GlobalContext)

    const handleLogout = () => {
  
        updateGlobalVariable([]);
        localStorage.removeItem('Session');
        window.location.reload();

      };

    return <>
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button onClick={handleLogout}>Cerrar sesión</button>
        </header>
     
    </>
}