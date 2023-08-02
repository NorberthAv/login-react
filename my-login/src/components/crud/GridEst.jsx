import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Form, Button } from 'react-bootstrap';
import { VariablesContext } from './../../Context/VariablesGlobales';
import { Link } from 'react-router-dom';
import QRCode from "react-qr-code";
import { VerPDF } from '../pdf/CarnetPDF';
import { PDFViewer } from '@react-pdf/renderer';



export function GridEstudiantes() {

    const { DatosEstudiantes, updateDatosEstudiantes } = useContext(VariablesContext)
    const [verPDFs, setverPDFs ]  = useState (false);
    const [idselected, setidselected] =useState(null);

    const handlepdf = (id) => {
        setverPDFs(true);
        setidselected(id)
    }

    return <>
        <br />
        <div className='card'>

            <div className='card-header'>
                <Link to={`/registrar-estudiante`}>
                    <button type="button" className='btn btn-md btn-outline-primary left'>
                        <strong>Nuevo</strong>
                    </button>
                </Link>
                <h4><strong>Estudiantes Registrados</strong></h4>
            </div>
            <div className='card-body'>
                <div className='lista row'>
                    {
                        DatosEstudiantes.map((val, key) => {
                            return <div key={key} className='col-xs-12 col-sm-12 col-md-4 carta-estudiante'>
                                <div className='carta-estudiante-body'>
                                    <div className='foto_perfil'>
                                        <img src={`data:image/jpg;base64,${val.foto}`} className='img-perfiles' alt="foto de perfil" />
                                    </div>
                                    <div className='carta-estudiante-datos'>
                                        {/* <p>Id: {val.id}</p> */}
                                        <p><strong>Cédula:</strong> {val.cedula}</p>
                                        <p><strong>Nombre:</strong> {val.nombre}</p>
                                        <p><strong>Edad:</strong> {val.edad}</p>
                                        <p><strong>Nivel:</strong> {val.nivel}</p>
                                        <p><strong>Grupo:</strong> {val.grupo}</p>
                                        <p><strong>Mensualidad:</strong> {val.mensualidad}</p>
                                        <p><strong>Fecha de ingreso:</strong> {moment(val.fechaIngresoEstudiante).format('DD/MM/YYYY') }</p>
                                        <br />
                                        
                                        <button type="button" className='btn btn-sm btn-primary' onClick={() => handlepdf(val.id)}>
                                                Ver PDF
                                        </button>

                                        <Link to={`/detallados/${val.id}`}>
                                            <button type="button" className='btn btn-sm btn-primary'>
                                                Ver Detalles
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>

            </div>
        </div>
        {verPDFs ? (
        <PDFViewer style={{ width:"100%",height:"90vh" }}>
        <VerPDF  IdEstudianteProp={idselected}/>
        </PDFViewer>
        ) : null
        }
    </>
}