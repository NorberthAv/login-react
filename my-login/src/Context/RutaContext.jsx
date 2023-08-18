import { createContext, useState , useEffect  } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Detallados} from '../components/detallado/Detalle';
import {AppWithContext} from '../App';
import { Crud } from '../components/crud/Crud';
import { Crudedit } from '../components/crud/edit/Crudedit';
import { GridEstudiantes } from '../components/crud/GridEst';

export const RutaContext = createContext();

export const RutaProvider = () => {

  return (

      <BrowserRouter>
        <Routes>
        <Route path="/" element={<AppWithContext><GridEstudiantes/></AppWithContext>}/>
        <Route path="/editar/:id" element={<AppWithContext><Crudedit/></AppWithContext>}/>
        <Route path="/registrar-estudiante" element={<AppWithContext><Crud/></AppWithContext>}/>
        <Route path="/Detallados/:id" element={<Detallados/>}/>
        
      </Routes>
      </BrowserRouter>


  );
};