import {Body_espacio} from './Cuerpo';
import { useState ,useContext  } from 'react';
import logo from './../logo.svg';
import { GlobalContext } from './../Context/GlobalContext';


const DashboardVertical = () => {
const { Session, updateGlobalVariable } = useContext(GlobalContext)
const name = Session[0].data.user ? Session[0].data.user : 'No esta Conectado'
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-4 col-sm-3 dashboard">
            <ul className="nav flex-column">
            <div className="datos-user">
              <img src={logo} className="user-logo" alt="logo" />
              <p>Usuario: {name}</p>
            </div>
            <hr />
              <li className="nav-item">
                <a className="nav-link" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#profile">
                  Profile
                </a>
              </li>
            </ul>
            <br />
          </div>
          <div className="col-xs-8 col-sm-9">
            <Body_espacio />
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardVertical;