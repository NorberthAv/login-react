import { useState ,useContext  } from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from './../logo.svg';
import axios from 'axios';
import { actualizarBandeja } from '../App';
import { GlobalContext } from './../Context/GlobalContext';

function LoginForm() {

  const { Session, updateGlobalVariable } = useContext(GlobalContext)

  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [UserName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(`Email: ${email}\nContraseña: ${password}`);

    if(UserName == '' || password == ''){
      setError(true)
      return
    }
    setError(false)

    let parametros = {
      email: email,
      userName: UserName,
      password: password,
    }
    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        email: email,
        userName: UserName,
        password: password,
      });
      console.log(response);
      if(response.status == 200){
        // window.localStorage.setItem('datUser', response.data)
        updateGlobalVariable([response]);
       
      }else{
        updateGlobalVariable([]);
      }
      // Aquí puedes procesar la respuesta del servidor
    } catch (error) {
      console.error(error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

  return (
    <>

    <Form onSubmit={handleSubmit}>
      <Form.Group className="labels"  controlId="email">
       <b><Form.Label>Correo electrónico:</Form.Label></b>
        <Form.Control
          type="email"
          name="email"
          placeholder="Escribe tu correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
      <Form.Group className="labels"  controlId="password">
       <b><Form.Label>Contraseña:</Form.Label></b> 
        <Form.Control
          type="password"
          name="contraseña"
          placeholder="Escribe tu contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
        <br/>
      <Button variant="primary" type="submit">
        Iniciar sesión
      </Button>
    </Form>
    {error && <p>Todos los campos son Obligatorios</p>}
    </>
  );
}


export default LoginForm;