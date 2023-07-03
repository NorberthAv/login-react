const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))

const pool = mysql.createPool({
  connectionLimit: 10, // Establece el límite de conexiones en 10
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bd_login'
})

app.get('/', (req, res) => {
	res.send('hola desde tu primera ruta de la Api')
})
app.post('/api/usuarios', (req, res) => {
	const { nombreCompleto, UserName, fechaNacimiento, genero, email, password } = req.body;
  
	const saltRounds = 10; // Número de rondas de salt que se aplicarán al hash
	const plainTextPassword = password;
  
	bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
	  if (err) {
		// Manejar el error
		return res.status(500).send({ error: 'Error al generar el hash de la contraseña' });
	  } else {
		// El hash de la contraseña se genera con éxito
		const values = [nombreCompleto, UserName, fechaNacimiento, genero, email, hash];
		console.log(values);
  
		pool.getConnection((err, connection) => {
		  if (err) {
			return res.status(500).send({ error: 'Error al obtener la conexión de la base de datos' });
		  }
  
		  connection.query("INSERT INTO usuarios (nombre, username, fecha_nacimiento, genero, email, password) VALUES (?, ?, ?, ?, ?, ?)", values, (err, result) => {
			connection.release();
			if (err) {
			  console.log(err, 'error');
			  return res.status(500).send({ error: 'Error al guardar los datos en la base de datos' });
			}
  
			res.status(200).send({ message: 'Usuario creado exitosamente' });
		  });
		});
	  }
	});
  });
  app.post('/api/login', (req, res) => {
	const { userName, password } = req.body;
  
	pool.getConnection((err, connection) => {
	  if (err) {
		return res.status(500).send({ error: 'Error al obtener la conexión de la base de datos' });
	  }
  
	  connection.query("SELECT * FROM usuarios WHERE username = ? OR email = ?", [userName, userName], (err, result) => {
		connection.release();
		if (err) {
		  return res.status(500).send({ error: 'Error al realizar la consulta a la base de datos' });
		}
  
		if (result && result.length > 0) {
		  const hash = result[0].password;
  
		  bcrypt.compare(password, hash, (err, passwordMatch) => {
			if (err) {
			  console.log(err, 'error');
			  return res.status(500).send({ error: 'Error al comparar las contraseñas' });
			}
  
			if (passwordMatch) {
			  res.status(200).send({
				"id": result[0].id,
				"user": result[0].nombre,
				"username": result[0].username
			  });
			} else {
			  res.status(400).send('Contraseña incorrecta');
			}
		  });
		} else {
		  res.status(400).send('Usuario no existe');
		}
	  });
	});
  });

app.listen(4000, () => console.log('hola soy el servidor'))