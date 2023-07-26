import { useState, useContext } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export function Crud({setActualizarBandeja}) {
    const [Error, setError] = useState('');
    const [Imagen, setImagen] = useState(null);
    const [Estudiante, setEstudiante] = useState('');
    const [Cedula, setCedula] = useState('');
    const [Edad, setEdad] = useState('');
    const [Nivel,setNivel] = useState('');
    const [Grupo, setGrupo] = useState('');
    const [Mensualidad, setMensualidad] = useState('0');
    const [FechaIngreso, setFechaIngreso] = useState('');

    function manejarCambio(e) {
        setImagen(e.target.files[0]);
      }
    const CreateEstudiante = async (event) =>{
        event.preventDefault();

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
                // window.localStorage.setItem('datUser', response.data)
          
              }else if(response.status == 202){
                
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
                {Error && <p>{Error}</p>}
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
                            placeholder="Fecha de Ingreso"
                            value={FechaIngreso}
                            onChange={(event) => setFechaIngreso(event.target.value)}
                            />
          
                        </div>
                    </div>
                    <br />
                    <div className='d-flex right'>
                    <Button variant="outline-success" type="button" onClick={CreateEstudiante} style={{ margin: '0.5%' }}  id="guardar">
                        Guardar
                    </Button>
                    <Button variant="outline-danger" type="button" style={{ margin: '0.5%' }}  id="limpiar">
                    Limpiar
                    </Button>
                        <br />
                   </div>
                </div>
            </div>
    </>
}