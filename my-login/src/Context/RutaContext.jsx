import { createContext, useState , useEffect  } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Detallados} from '../components/detallado/Detalle';
import {AppWithContext} from '../App';


export const RutaContext = createContext();

export const RutaProvider = () => {

  return (

      <BrowserRouter>
        <Routes>
        <Route path="/" element={<AppWithContext />}/>
        <Route path="/detalle" element={<Detallados/>}/>
        <Route path="/registrar-estudiante" element={<AppWithContext/>}/>
        
      </Routes>
      </BrowserRouter>


  );
};