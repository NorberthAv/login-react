import { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import {VariablesContext } from './../../Context/VariablesGlobales';



export function GridEstudiantes (){

const {DatosEstudiantes, updateDatosEstudiantes } = useContext(VariablesContext)

return <>
<br />
<div className='card'>
    {/* <button onClick={empleados}>Listar</button> */}
    <div className='card-header'><h4><strong>Estudiantes Registrados</strong></h4></div>
    <div className='card-body'>
        <div className='lista row'>
        {
        DatosEstudiantes.map((val,key) => {
            return <div key={key} className='col-xs-12 col-sm-12 col-md-4 carta-estudiante'>
                <div className='carta-estudiante-body'>
                <div className='foto_perfil'>
                <img src={`data:image/jpg;base64,${val.foto }`} className='img-perfiles' alt="foto de perfil" />
                </div>
                <div className='carta-estudiante-datos'>
                    {/* <p>Id: {val.id}</p> */}
                    <p><strong>Cédula:</strong> {val.cedula}</p>
                    <p><strong>Nombre:</strong> {val.nombre}</p>
                    <p><strong>Edad:</strong> {val.edad}</p>
                    <p><strong>Nivel:</strong> {val.nivel}</p>
                    <p><strong>Grupo:</strong> {val.grupo}</p>
                    <p><strong>Mensualidad:</strong> {val.mensualidad}</p>
                    <p><strong>Fecha de ingreso:</strong> {val.fecha_ingreso}</p>
                    <br />
                    <button type="button"  className='btn btn-sm btn-primary'>
                    Ver Detalles
                    {/* <Link to="/detallados">Ver Detalles</Link> */}
                    </button>
                   
                </div>
                </div>
            </div>

        })
        }

        </div>

    </div>
</div>
</>
}