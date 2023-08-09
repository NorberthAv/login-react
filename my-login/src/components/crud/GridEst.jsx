import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import { Form, Button, Modal } from 'react-bootstrap';
import { VariablesContext } from './../../Context/VariablesGlobales';
import { Link } from 'react-router-dom';
import QRCode from "react-qr-code";
import { VerPDF } from '../pdf/CarnetPDF';
import { PDFViewer } from '@react-pdf/renderer';
// import Modals from '../modals/Modals';
// import {ModalLara} from '../modals/ModalLara';



export function GridEstudiantes() {

    const { DatosEstudiantes, updateDatosEstudiantes } = useContext(VariablesContext)
    const [verPDFs, setverPDFs] = useState(false);
    const [idselected, setidselected] = useState(null);
    const [show, setShow] = useState(false);

    const handlepdf = (id) => {
        setverPDFs(true);
        setidselected(id);
        setShow(true);
    }
    const handleClose = () => setShow(false);

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
                            return <div key={key} className='col-xs-12 col-sm-12 col-md-6 col-lg-4 carta-estudiante'>
                                <div className='carta-estudiante-body'>
                                    <div className='foto_perfil'>
                                        <img src={`data:image/jpg;base64,${val.foto}`} className='img-perfiles' alt="foto de perfil" />
                                    </div>
                                    <div className='carta-estudiante-datos'>

                                        <p className='parrafo-estudiante'>
                                            <strong>Cédula:</strong> {val.cedula} <br />
                                            <strong>Nombre:</strong> {val.nombre}<br />
                                            <strong>Edad:</strong> {val.edad}<br />
                                            <strong>Nivel:</strong> {val.nivel}<br />
                                            <strong>Grupo:</strong> {val.grupo}<br />
                                            <strong>Mensualidad:</strong> {val.mensualidad}<br />
                                            <strong>Fecha de ingreso:</strong> {moment(val.fechaIngresoEstudiante).format('DD/MM/YYYY')}
                                        </p>

                                        <div className='d-flex center'>
                                            <Link to={`/detallados/${val.id}`}>
                                                <button type="button" className='btn btn-sm btn-primary mg-1'>
                                                    Ver
                                                </button>
                                            </Link>
                                            <Link>
                                                <button type="button" className='btn btn-sm btn-primary mg-1' onClick={() => handlepdf(val.id)}>
                                                    PDF
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>

            </div>
        </div>
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" >
            <Modal.Header closeButton>
                {/* <Modal.Title>Titulo Modal</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                {verPDFs ? (
                    <PDFViewer style={{ width: "100%", height: "90%" }}>
                        <VerPDF IdEstudianteProp={idselected} />
                    </PDFViewer>
                ) : null
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

        {/* <Modal
        animationType="slide"
        onDismiss={() => console.log('close')}
        onShow ={() => console.log('show')}
        transparent = "false"
        > */}
        {/* </Modal> */}

    </>
}