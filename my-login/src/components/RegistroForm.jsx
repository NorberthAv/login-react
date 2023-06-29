import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function RegistroForm() {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Nombre completo: ${nombreCompleto}\nFecha de nacimiento: ${fechaNacimiento}\nGénero: ${genero}\nEmail: ${email}\nContraseña: ${password}`);
    // Aquí puedes enviar los datos al servidor
  };

  return (
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
  );
}

export default RegistroForm;