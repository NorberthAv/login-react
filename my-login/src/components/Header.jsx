import { createContext, useState, useContext  , useEffect  } from 'react';
import { GlobalContext } from './../Context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from './../logo.svg';

function ValidarSeccionheader(){
    
    const handleLogout = () => {
        
        updateGlobalVariable([]);
        localStorage.clear();
        localStorage.removeItem('DatosEstudiantes');
        localStorage.removeItem('Session');
        window.location.reload();
        
    };
    const { Session, updateGlobalVariable } = useContext(GlobalContext)
    if (Session.length > 0) {
        // console.log(Session)
        return (
          <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <img src={logo} className="App-logo left-logo" alt="logo" />
                    </div>
                    <div className='col-4'>
                        <button className='btn btn-outline-primary btn-cierre' onClick={handleLogout}>
                           Cerrar Sessión  <FontAwesomeIcon icon={['fas', 'times']} />
                        </button>
                    </div>
                </div>
            </div>     
          </>
        );
      }else{
       return <img src={logo} className="App-logo" alt="logo" />
      }
}

export function Header() {

    
    return <>
        <header className="App-header">
        {ValidarSeccionheader()}
        </header>
    </>
}