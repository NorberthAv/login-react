import logo from './../logo.svg';
import {Card, CardRegister} from './Card';
import { useState } from 'react';

export function LoginForm(){

const [registro, setRegistro] = useState('');
 const actualizarBandeja = (res) => {
    setRegistro(res);
  };
function validarButon(){
    if (registro == true) {
      return  <CardRegister/>
    }else{
      return   <Card/>
    }
} 
return <div className='card-login'>
            <div className="card text-center">
                <div className='d-flex'>
                <button className='btn btn-sm btn-primary btn-separar' id='login' onClick={() => actualizarBandeja(false)}>Login</button>
                <button className='btn btn-sm btn-primary btn-separar' id='registro' onClick={() => actualizarBandeja(true)}>Registro</button>
                </div>
                {validarButon()}
            </div>
    </div>
}