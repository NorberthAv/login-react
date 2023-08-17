import React,{ useState, useContext, useRef } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { VariablesProvider, VariablesContext } from './../../Context/VariablesGlobales';

export function Crud() {  
    const {ActualizarBandeja, setActualizarBandeja } = useContext(VariablesContext)
    const [Error, setError] = useState('');
    const [Errorvalida, setErrorvalida] = useState(false);
    const [Imagen, setImagen] = useState(null);
    const [Estudiante, setEstudiante] = useState('');
    const [Cedula, setCedula] = useState('');
    const [Edad, setEdad] = useState('');
    const [Nivel,setNivel] = useState('');
    const [Grupo, setGrupo] = useState('');
    const [Mensualidad, setMensualidad] = useState('0');
    const [FechaIngreso, setFechaIngreso] = useState('');
    const fileInputRef = useRef(null);

    function manejarCambio(e) {
        setImagen(e.target.files[0]);
      }
    const limpiarCampos = () => {
        setImagen(null);
        setEstudiante('');
        setCedula('');
        setEdad('');
        setNivel('');
        setGrupo('');
        setMensualidad('0');
        setFechaIngreso('');
        setError('');
        // ---------------Campo Archivo----------------
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }

      };
 
    const CreateEstudiante = async (event) =>{
        event.preventDefault();

   
        const patterntext = /^[A-Za-z\s]+$/;
        const patternnumb = /^\d+$/;

        if(Estudiante != ''){
            if(!patterntext.test(Estudiante)){
                let data = {
                  mensaje: 'Caracter invalido en el campo Estudiante.',
                  estado: '1'
                };
                setErrorvalida(data)
                setTimeout(() => {
                  setErrorvalida(false);
                }, 3000);  
                return
              }
        }
        if(Edad != ''){
          if(!patternnumb.test(Edad)){
            let data = {
              mensaje: 'Formato Incorrecto en el campo Edad.',
              estado: '2'
            };
            setErrorvalida(data)
            setTimeout(() => {
              setErrorvalida(false);
            }, 3000);  
            return
          }
        }
        if(Cedula != ''){
            if(!patternnumb.test(Cedula)){
              let data = {
                mensaje: 'Formato Incorrecto en el campo Cedula.',
                estado: '2'
              };
              setErrorvalida(data)
              setTimeout(() => {
                setErrorvalida(false);
              }, 3000);  
              return
            }
        }
          if(!patternnumb.test(Mensualidad)){
            let data = {
              mensaje: 'Caracter invalido en el campo Mensualidad.',
              estado: '1'
            };
            setErrorvalida(data)
            setTimeout(() => {
              setErrorvalida(false);
            }, 3000);  
            return
          }
    
        if(Estudiante == ''|| Cedula == ''|| Imagen == '' || Edad == ''|| Nivel == ''|| Grupo == ''|| Mensualidad == ''|| FechaIngreso == ''){
            setError('Todos los campos son Obligatorios')
            setTimeout(() => {
                setError(false);
              }, 3000);  
            return
        }
        const formData = new FormData();
        formData.append('CedulaEstudiante', Cedula);
        formData.append('NameEstudiante', Estudiante);
        formData.append('EdadEstudiante', Edad);
        formData.append('NivelEstudiante', Nivel);
        formData.append('GrupoEstudiante', Grupo);
        formData.append('MensualidadEstudiante', Mensualidad);
        formData.append('FechaIngresoEstudiante', FechaIngreso);
        formData.append('ImagenEstudiante', Imagen);
        
           try{

            const response = await axios.post('http://localhost:4000/registro/estudiantes',  formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              });
              console.log('envia',formData,response);

              if(response.status == 200){
                Swal.fire({
                    title: '¡Estudiantes!',
                    text: 'Estudiante registrado con éxito.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  });
          
              }else if(response.status == 202){
                
                Swal.fire({
                    title: '¡Estudiantes!',
                    text: response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  });
                setError(response.data.message)
                setTimeout(() => {
                    setError(false);
                  }, 3000);
                console.log(response.data.message);
        
              }

        }catch (error) {
     
      console.error(error);

        }
        setActualizarBandeja(true);
    }

    return <>
           <br />
            <div className='card'>
                <div className='card-header'>
                    <h4>Registro de Estudiantes</h4>
                </div>
                <br />
         
                <div className='card-body'>
   
                    <div className='row'>
                        <div className='col-xs-12 col-sm-12 col-md-4 center' >
                            <div className='contenedor-img'>
                                <img className='img' src={Imagen ? URL.createObjectURL(Imagen) : ""}/>
                            </div>
                        </div>
                        <div className='col-xs-12 col-sm-12 col-md-8 justify'>
                            <Form.Label ><strong>Foto: </strong></Form.Label> 
                            <Form.Control
                            type="file"
                            className='form-control' 
                            accept="image/*"
                            placeholder="Foto de Perfil"
                            ref={fileInputRef}
                            onChange={manejarCambio}
                            />
                        </div>
                        <div className='col-12 justify'>
                            <Form.Label ><strong>Estudiante: </strong></Form.Label> 
                            <Form.Control
                            type="text"
                            className='form-control' 
                            placeholder="Nombre del Estudiante"
                            value={Estudiante}
                            onChange={(event) => setEstudiante(event.target.value)}
                            />
                        </div>
                        <div className='col-6 justify'>
                        <Form.Label ><strong>Cedula: </strong></Form.Label> 
                            <Form.Control
                            type="text"
                            maxLength={8}
                            className='form-control' 
                            placeholder="Cedula del Estudiante"
                            value={Cedula}
                            onChange={(event) => setCedula(event.target.value)}
                            />
          
                        </div>
                        <div className='col-6 justify'>
                        <Form.Label ><strong>Edad: </strong></Form.Label> 
                            <Form.Control
                            type="number"
                            className='form-control' 
                            placeholder="Edad del Estudiante"
                            value={Edad}
                            onChange={(event) => setEdad(event.target.value)}
                            />
          
                        </div>
                        <div className='col-6 justify'>
                        <Form.Label ><strong>Nivel: </strong></Form.Label> 
                            <Form.Control
                            type="text"
                            className='form-control' 
                            placeholder="Nivel del Estudiante"
                            value={Nivel}
                            onChange={(event) => setNivel(event.target.value)}
                            />
                        </div>
                        <div className='col-6 justify'>
                        <Form.Label ><strong>Grupo: </strong></Form.Label> 
                            <Form.Control
                            type="text"
                            className='form-control' 
                            placeholder="Grupo del Estudiante"
                            value={Grupo}
                            onChange={(event) => setGrupo(event.target.value)}
                            />
          
                        </div>
                        <div className='col-6 justify'>
                        <Form.Label ><strong>Mensualidad: </strong></Form.Label> 
                            <Form.Control
                            type="number"
                            className='form-control' 
                            placeholder="Mensualidad del Estudiante"
                            value={Mensualidad}
                            onChange={(event) => setMensualidad(event.target.value)}
                            />
                        </div>
                        <div className='col-6 justify'>
                        <Form.Label ><strong>Fecha de Ingreso: </strong></Form.Label> 
                            <Form.Control
                            type="date"
                            className='form-control' 
                            value={FechaIngreso}
                            onChange={(event) => setFechaIngreso(event.target.value)}
                            />
          
                        </div>
                    </div>
                    <br />
                    {Errorvalida && <p style={{ color: 'red' }}>{Errorvalida.mensaje}</p>}
                    {Error && <p style={{ color: 'red' }}>{Error}</p>}
                    <div className='d-flex right'>
                    <Link to={`/`}>
                    <button  type="button" className='btn btn-primary btn-sm' style={{ margin: '0.5%' }}>
                        Volver
                    </button>
                    </Link>
                    <button  type="button" className='btn btn-danger btn-sm' style={{ margin: '0.5%' }} onClick={limpiarCampos} id="limpiar">
                    Limpiar
                    </button>
                    <button  type="button" className='btn btn-success btn-sm' onClick={CreateEstudiante} style={{ margin: '0.5%' }}  id="guardar">
                        Guardar
                    </button>
                 
                        <br />
                   </div>
                </div>
            </div>
    </>
}