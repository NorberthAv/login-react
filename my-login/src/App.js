import logo from './logo.svg';
import './App.css';
import { GlobalProvider } from './Context/GlobalContext';
import { useState,useContext , useEffect } from 'react';
import {Header} from './components/Header';
import {Body_espacio} from './components/Cuerpo';
import DashboardVertical from './components/Dasboard';
import { GlobalContext } from './../Context/GlobalContext';
const { Session, updateGlobalVariable } = useContext(GlobalContext)

// export let [Session, setSession] = useState('');
export const actualizarBandeja = (res) => {
  return res
};


function App() {

  
  
  function validarSeccion(){
    if (Session != []) {
      return <>
      <Header/>
      <DashboardVertical />
      </>
    }else{
      return <>
      <Header/>
      <Body_espacio />
      <br/> </>
    }
} 
  return (
    <div className="App fondo">
    <GlobalProvider>
    {validarSeccion()}
    </GlobalProvider>
    </div>
  );
}

export default App;
