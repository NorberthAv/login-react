import logo from './logo.svg';
import './App.css';
import { useHistory, useLocation } from 'react-router-dom';
import { GlobalProvider, GlobalContext } from './Context/GlobalContext';
import { VariablesProvider, VariablesContext } from './Context/VariablesGlobales';
import{RutaProvider, RutaContext } from './Context/RutaContext';
import { useState,useContext , useEffect } from 'react';
import {Header} from './components/Header';
import {Body_espacio} from './components/Cuerpo';
import { MenuBoot } from './components/menu/MenuBootstrap';
import DashboardVertical from './components/Dasboard';
import {Sidebar} from './components/Sidebar';
import {Crud} from './components/crud/Crud';
import { Crudedit } from './components/crud/edit/Crudedit';
import { GridEstudiantes } from './components/crud/GridEst';
import { Detallados } from './components/detallado/Detalle';

export function AppWithContext({children}) {
  const location = useLocation();
  const { Session, updateGlobalVariable } = useContext(GlobalContext);


// function RutaValidar(){

// switch (location.pathname) {
//   case '/':
//     return <GridEstudiantes/>
//     break;

//   case '/editar/:id':
//     return <Crudedit/>
//     break;

//   case '/registrar-estudiante':
//     return <Crud/>
//     break;

//   default:
//     break;
// }
//  }
  
  function ValidarSeccion() {
    if (Session.length > 0) {
      return (
        <>
          <MenuBoot />
          <div className='container container-pad'>
            {children}
            {/* {RutaValidar()}  */}
          </div>
        </>
      );
    } else {
      // console.log(Session,'loged')
      return (
        <>
          <Header />
          <Body_espacio />
          <br />
        </>
      );
    }
  }

  return (
    <div className="App fondo" id="body-pd">
          {ValidarSeccion()}
    </div>
  );
}
function App() {
  
  return (

    <GlobalProvider>
          <VariablesProvider>
          <RutaProvider>
        <AppWithContext />
          </RutaProvider>
        </VariablesProvider>
    </GlobalProvider>

  );
}


export default App;
