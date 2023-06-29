import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from './../logo.svg';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}\nContraseña: ${password}`);
    // Aquí puedes enviar los datos al servidor
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
    </>
  );
}

export default LoginForm;