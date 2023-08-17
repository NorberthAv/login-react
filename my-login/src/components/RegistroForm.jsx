import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

function RegistroForm() {
  const [error, setError] = useState(false);
  const [errorvalida, setErrorvalida] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [UserName,setUserName] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Aquí puedes enviar los datos al servidor
   

    if(password != confirmPassword){
      setError(true)
      return
    }
    if(nombreCompleto == '' || UserName == ''|| fechaNacimiento == ''|| genero == '' || email == ''|| password == ''){
     
      let data = {
        mensaje: 'Todos los campos son requeridos',
        estado: '1'
      };
      setErrorvalida(data)
      setTimeout(() => {
        setErrorvalida(false);
      }, 3000);  
      return
    }
    setError(false)
    try {
      const response = await axios.post('http://localhost:4000/api/usuarios', {
        nombreCompleto: nombreCompleto,
        UserName: UserName,
        fechaNacimiento: fechaNacimiento,
        genero: genero,
        email: email,
        password: password,
      });
      if(response.status == 200){

        Swal.fire({
          title: '¡Usuario!',
          text: 'Usuario creado exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        setError(false);
        setNombreCompleto('');
        setUserName('');
        setFechaNacimiento('');
        setGenero('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
      console.log(response);
     
      // Aquí puedes procesar la respuesta del servidor
    } catch (error) {
      console.error(error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
 
  };

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="labels" controlId="nombreCompleto">
       <b><Form.Label >Nombre completo:</Form.Label></b> 
        <Form.Control
          type="text"
          placeholder="Escribe tu nombre completo"
          value={nombreCompleto}
          onChange={(event) => setNombreCompleto(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="labels" controlId="UserName">
       <b><Form.Label >Usuario:</Form.Label></b> 
        <Form.Control
          type="text"
          placeholder="Escribe tu nombre de Usuario"
          value={UserName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="labels" controlId="fechaNacimiento">
        <b><Form.Label >Fecha de nacimiento:</Form.Label></b>
        <Form.Control
          type="date"
          placeholder="Selecciona tu fecha de nacimiento"
          value={fechaNacimiento}
          onChange={(event) => setFechaNacimiento(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="labels" controlId="genero">
        <b><Form.Label >Género:</Form.Label></b>
        <Form.Control as="select" value={genero} onChange={(event) => setGenero(event.target.value)}>
          <option value="">Selecciona tu género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="labels" controlId="email">
        <b><Form.Label >Correo electrónico:</Form.Label></b>
        <Form.Control
          type="email"
          placeholder="Escribe tu correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="labels" controlId="password">
       <b><Form.Label >Contraseña:</Form.Label></b> 
        <Form.Control
          type="password"
          placeholder="Escribe tu contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="labels" controlId="confirmPassword">
       <b><Form.Label >Confirmar contraseña:</Form.Label></b> 
        <Form.Control
          type="password"
          placeholder="Escribe tu contraseña de nuevo"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Registrarse
      </Button>
    </Form>
    <br />
    {errorvalida && <p>{errorvalida.mensaje}</p>}
     {error && <p>La Contraseña no Coincide</p>}
     </>
  );
}

export default RegistroForm;