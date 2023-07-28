import {Body_espacio} from './Cuerpo';
import {Crud} from './crud/Crud';
import {GridEstudiantes} from './crud/GridEst';
import { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import logo from './../logo.svg';
import { GlobalContext } from './../Context/GlobalContext';
import { VariablesProvider, VariablesContext } from './../Context/VariablesGlobales';
import { NavLink } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export function Sidebar({children}){
    const { Session, updateGlobalVariable } = useContext(GlobalContext)
    const name = Session[0].data.user ? Session[0].data.user : 'No esta Conectado'
    const {ActualizarBandeja, setDatosEstudiantes,updateDatosEstudiantes } = useContext(VariablesContext)
    const location = useLocation();


// useEffect(() => {
//       estudianteslist();
//   }, []);


useEffect(() => {
    estudianteslist();
  }, [ActualizarBandeja]);
  

const estudianteslist = () =>{
    const response = axios.get('http://localhost:4000/get/estudiantes')
    .then(response => {
        // console.log(response.data, response.status);
        if (response.status === 200) {
          
          // setDatosEstudiantes(response.data);
          updateDatosEstudiantes(response.data);

        } else {
          console.log(response, 'Error');
        }
      })
      .catch(error => {
        console.error(error);
      });
}
    const ElementMenu = [

    {
        path:"/",
        name:"Home",
        icon:"fa-users"
    },
    {
        path:"/detalles",
        name:"detalles",
        icon:"fa-users"
    },
    {
        path:"/registrar-estudiante",
        name:"Registrar Estudiantes",
        icon:"fa-users"
    }

    ]
        
    

    return <>
  <div className='container-fluid'>
  <div className='row'>
    <div className='col-md-3 col-lg-2 d-none d-md-block'>
      <div className='sidebar'>
        <div className='sidebarContent'>
          <br />
          <br />
          <div className='top_section'>
            <h1 className='logo_sidebar'>Logo</h1>
            <div className='bars'></div>
          </div>
          {ElementMenu.map((item, index) => (
            <NavLink
              className='link'
              to={item.path}
              style={location.pathname === item.path ? { color: 'red' } : null}
              key={index}
            >
              <div className='link-text'>
                <strong>
                  <FontAwesomeIcon icon={item.icon} />
                  &nbsp;
                  {item.name}
                </strong>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
    <div className='col-12 col-md-9 col-lg-10'>
      <div className='d-md-none'>
        <button
          className='btn btn-primary left-menu'
          type='button'
          data-toggle='collapse'
          data-target='#sidebarCollapse'
          aria-controls='sidebarCollapse'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'><FontAwesomeIcon icon={'th-list'} /></span>
        </button>
      </div>


      <div className='collapse' id='sidebarCollapse'>
        <div className='sidebar'>
          <div className='sidebarContent'>
            <br />
            <br />
            <div className='top_section'>
              <h1 className='logo_sidebar'>Logo</h1>
              <div className='bars'></div>
            </div>
            {ElementMenu.map((item, index) => (
              <NavLink
                className='link'
                style={location.pathname === item.path ? { color: 'red' } : null}
                to={item.path}
                key={index}
              >
                <div className='icon'>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <br/>
              </NavLink>
                
            ))}
          </div>
        </div>
      </div>
      <main>
        {children}
        {/* <Crud setActualizarBandeja={setActualizarBandeja}/> */}
        {/* <GridEstudiantes /> */}
      </main>
    </div>
  </div>
</div>

    </>
}