import logo from './logo.svg';
import './App.css';
import { GlobalProvider, GlobalContext } from './Context/GlobalContext';
import { useState,useContext , useEffect } from 'react';
import {Header} from './components/Header';
import {Body_espacio} from './components/Cuerpo';
import DashboardVertical from './components/Dasboard';


function AppWithContext() {
  const { Session, updateGlobalVariable } = useContext(GlobalContext);

  function validarSeccion() {
    if (Session.length > 0) {
      // console.log(Session)
      return (
        <>
          <Header />
          <DashboardVertical />
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
    <div className="App fondo">
          {validarSeccion()}
    </div>
  );
}
function App() {
  return (
    <GlobalProvider>
      <AppWithContext />
    </GlobalProvider>
  );
}


export default App;
