import {Body_espacio} from './Cuerpo';
import {Crud} from './crud/Crud';
import {GridEstudiantes} from './crud/GridEst';
import { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import logo from './../logo.svg';
import { GlobalContext } from './../Context/GlobalContext';


const DashboardVertical = () => {


const { Session, updateGlobalVariable } = useContext(GlobalContext)
const name = Session[0].data.user ? Session[0].data.user : 'No esta Conectado'

const [ActualizarBandeja, setActualizarBandeja] = useState(false);
const [DatosEstudiantes, setDatosEstudiantes] = useState([]);

useEffect(() => {
    estudianteslist();
  }, [ActualizarBandeja]);
  

const estudianteslist = () =>{
    const response = axios.get('http://localhost:4000/get/estudiantes')
    .then(response => {
        // console.log(response.data, response.status);
        if (response.status === 200) {
          setDatosEstudiantes(response.data);
        } else {
          console.log(response, 'Error');
        }
      })
      .catch(error => {
        console.error(error);
      });
}

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
        <div className='container expansor'>
          <Crud setActualizarBandeja={setActualizarBandeja}/>
          <GridEstudiantes DatosEstudiantes={DatosEstudiantes}/>
        </div>
        </div>
      </div>
    </div>
    );
  };
  
  export default DashboardVertical;