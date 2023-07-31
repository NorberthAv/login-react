import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Form, Button } from 'react-bootstrap';
import { GlobalProvider, GlobalContext } from './../../Context/GlobalContext';
import { VariablesContext } from './../../Context/VariablesGlobales';
import { Link } from 'react-router-dom';


export function Detallados() {
    const params = useParams();
    const { Session, updateGlobalVariable } = useContext(GlobalContext);
    const [DataEstudiante, setDataEstudiante] = useState([]);
    useEffect(() => {
        EstudianteDetalle();
    }, []);

    function ValidarSeccion() {
        if (Session.length > 0) {
          return (
            <>
                 <Link to={`/`}>
                         <button type="button"  className='btn btn-sm btn-primary right'>
                        Volver
                        </button>
                </Link>
                <br />
            </>
          );
        } 
      }
    
    const EstudianteDetalle = async () => {

        let IdEstudiante = params.id;
        try {
            const response = await axios.post('http://localhost:4000/detalle/estudiantes', {
                // email: email,
                IdEstudiante: IdEstudiante,

            });

            console.log(response.data, 'aqui');
            if (response.status == 200) {
                setDataEstudiante([response.data])
                console.log(DataEstudiante, 'en200')
            } else if (response.status == 202) {

                alert('error');
            }
            console.log(DataEstudiante);

        } catch (error) {

            console.error(error);

        }
    }

    return <>
        <div className="container-detalles fondo">
   
            {
                DataEstudiante.map((val, key) => {
                    return <div key={key} className='card '>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <div className='foto_perfil_detalle'>
                                        <img src={`data:image/jpg;base64,${val.fotoEstudiante}`} className='img-perfiles' alt="foto de perfil" />
                                    </div>
                                </div>
                                <div className="col-8 center">
                                    <h4>Datos del Estudiante</h4>
                                    <div className='carta-estudiante-datos justify'>
                                        {/* <p>Id: {val.id}</p> */}
                                        <p><strong>Cédula:&nbsp;</strong>{val.cedulaEstudiante}</p>
                                        <p><strong>Nombre:&nbsp;</strong>{val.nombreEstudiante}</p>
                                        <p><strong>Edad:&nbsp;</strong>{val.edadEstudiante}</p>
                                        <p><strong>Nivel:&nbsp;</strong>{val.nivelEstudiante}</p>
                                        <p><strong>Grupo:&nbsp;</strong>{val.grupoEstudiante}</p>
                                        <p><strong>Mensualidad:&nbsp;</strong>{val.mensualidadEstudiante}</p>
                                        <p><strong>Fecha de ingreso:&nbsp;</strong>{   
                                         moment(val.fechaIngresoEstudiante).format('DD/MM/YYYY')   
                                        }</p>
                                        <p><strong>Estado:&nbsp;</strong>
                                            {(() => {
                                                switch (val.estado_solvencia) {
                                                    case 1:
                                                        return 'Solvente';
                                                    case 2:
                                                        return 'Deudor';
                                                    case 3:
                                                        return 'Deudor Recurrente';
                                                    default:
                                                        return '';
                                                }
                                            })()}
                                        </p>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer ">
                        {ValidarSeccion()}
                        </div>
                    </div>
                })
            }
        </div>
    </>
}