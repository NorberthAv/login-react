import { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';


export function GridEstudiantes ({DatosEstudiantes}){




return <>
<br />
<div className='card'>
    {/* <button onClick={empleados}>Listar</button> */}
    <div className='card-header'><h4><strong>Estudiantes Registrados</strong></h4></div>
    <div className='card-body'>
        <div className='lista row'>
        {
        DatosEstudiantes.map((val,key) => {
            return <div key={key} className='col-3 carta-estudiante'>
                <div className='carta-estudiante-body'>
                    <p>Id: {val.id}</p>
                    <p>Cédula: {val.cedula}</p>
                    <p>Nombre: {val.nombre}</p>
                    <p>Edad: {val.edad}</p>
                    <p>Nivel: {val.nivel}</p>
                    <p>Grupo: {val.grupo}</p>
                    <p>Mensualidad: {val.mensualidad}</p>
                    <p>Fecha de ingreso: {val.fecha_ingreso}</p>
                </div>
            </div>

        })
        }

        </div>

    </div>
</div>
</>
}