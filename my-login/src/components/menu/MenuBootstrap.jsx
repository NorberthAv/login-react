import {Body_espacio} from '../Cuerpo';
import {Crud} from '../crud/Crud';
import {GridEstudiantes} from '../crud/GridEst';
import { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import logo from '../../logo.svg';
import { GlobalContext } from '../../Context/GlobalContext';
import { VariablesProvider, VariablesContext } from '../../Context/VariablesGlobales';
// import { NavLink  } from 'react-bootstrap';
import { useHistory, useLocation, Link, NavLink   } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function MenuBoot() {
    const { Session, updateGlobalVariable } = useContext(GlobalContext)
    const {ActualizarBandeja, setDatosEstudiantes,updateDatosEstudiantes } = useContext(VariablesContext)
    const name = Session[0].data.user ? Session[0].data.user : 'No esta Conectado'
    const location = useLocation();
    const handleLogout = () => {
        
        updateGlobalVariable([]);
        localStorage.clear();
        localStorage.removeItem('DatosEstudiantes');
        localStorage.removeItem('Session');
        window.location.reload();
        
    };

useEffect(() => {
      Estudianteslist();
  }, []);


useEffect(() => {
    Estudianteslist();
  }, [ActualizarBandeja]);
  

const Estudianteslist = () =>{
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
    <nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">LOGO</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex={-1} id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
      <div className='center'>
            <div className="datos-user">
            <img src={logo} className="user-logo" alt="logo" />
            <p>Usuario: {name}</p>
          </div>
        <button className='btn btn-outline-info' onClick={handleLogout}>
                           Cerrar Sessión  <FontAwesomeIcon icon={['fas', 'times']} />
        </button>
            <div className='bars'></div>
      </div>
      <hr style={{ color: '#ffffff' } }/>
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
        {ElementMenu.map((item, index) => (
            
            <li className="nav-item" key={index}>

            <NavLink
              className='link link-padding'
              to={item.path}
              style={location.pathname === item.path ? { color: 'black' } : null}
            >
              <div className='link-text'>
                <strong>
                  <FontAwesomeIcon icon={item.icon} />
                  &nbsp;
                  {item.name}
                </strong>
              </div>
            </NavLink>
            </li>
          ))}  
        </ul>
        {/* <form class="d-flex mt-3" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-success" type="submit">Search</button>
        </form> */}
      </div>
    </div>
  </div>
</nav>
    </>
}