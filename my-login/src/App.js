import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {Header} from './components/Header';
import {Body} from './components/Cuerpo';
import DashboardVertical from './components/Dasboard';

function App() {
const [Session, setSession] = useState('');
 const actualizarBandeja = (res) => {
    setSession(res);
  };
  function validarSeccion(){
    if (Session == true) {
      return <>
      <Header/>
      <DashboardVertical/>
      </>
    }else{
      return <><Body/> </>
    }
} 
  return (
    <div className="App">
  
    {validarSeccion()}
    </div>
  );
}

export default App;
