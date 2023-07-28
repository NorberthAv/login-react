const express = require('express');
const cors = require('cors');
const jwt  = require('jsonwebtoken');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');

const app = express()
const upload = multer({ dest: 'uploads/' });

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
const TOKEN_KEY ="y6P4xzc9wfyMzlEe2oaPcmqxFfTe691mGx4oanFQ6RU=";

const verifyToken = (req, res , next) =>{
	const authHeader = req.header['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if(token==null)
		return res.status(401).send("Token Requerido");
	jwt.verify(token,TOKEN_KEY,(err, user) =>{
		if(err) return res.status(403).send("Token Invalido");

		req.user = user;
		next();
	});
}
app.get('/', (req, res) => {
	res.send('hola desde tu primera ruta de la Api')
})
app.get('/get/estudiantes', (req, res) => {
	
	pool.getConnection((err, connection) => {
		if (err) {
			return res.status(500).send({ error: 'Error al obtener la conexión de la base de datos' });
		}
		connection.query("SELECT * FROM estudiantes", (err, result) => {
		if(result && result.length > 0 ){
		return res.status(200).json(result);
		}
		else{
		return res.status(202).json('Sin Datos');	
		}
		});
	
		
	});
})

app.post('/registro/estudiantes',  upload.single('ImagenEstudiante'), (req, res) => {

	const cedula = req.body.CedulaEstudiante;
    const nombre = req.body.NameEstudiante;
    const edad = req.body.EdadEstudiante;
    const nivel = req.body.NivelEstudiante;
    const grupo = req.body.GrupoEstudiante;
    const mensualidad = req.body.MensualidadEstudiante;
    const fechaingreso = req.body.FechaIngresoEstudiante;
    const imagenpath = req.file.path;
	
// Lee el archivo como un Buffer
	const buffer = fs.readFileSync(imagenpath);
// Convierte el Buffer a Base64
	const imagenbase64 = buffer.toString('base64');

	const values = [cedula, nombre, edad, nivel, grupo, mensualidad,fechaingreso,imagenbase64];

	pool.getConnection((err, connection) => {
		if (err) {
			return res.status(500).send({ error: 'Error al obtener la conexión de la base de datos' });
		}
		connection.query("SELECT * FROM estudiantes WHERE cedula = ?", [cedula], (err, result) => {
		if(result && result.length > 0 ){
			return res.status(202).send({ message: 'Estudiante ya registrado' });
		}else{
			connection.query("INSERT INTO estudiantes (cedula, nombre, edad, nivel, grupo, mensualidad, fecha_ingreso, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", values, (err, result) => {
			connection.release();
				if (err) {
					console.log(err, 'error');
				return res.status(500).send({ error: 'Error al guardar los datos en la base de datos' });
				}
				return res.status(200).send({ message: 'Estudiante creado exitosamente' });
			});
		}
		});
	
		
	});
	
	
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
				const datos = {
					"id": result[0].id,
					"user": result[0].nombre,
					"username": result[0].username
				  };
				const token = jwt.sign(
					{userId:datos.id,username:datos.username,user:datos.user},
					TOKEN_KEY,
					{expiresIn:"2h"}
				);
				let ndatos = {...datos,token};
				return  res.status(200).json(ndatos);
			} else {
				return res.status(201).json({ error: 'Contraseña incorrecta' });
			}
		  });
		} else {
			return res.status(202).json({ error: 'Usuario no existe' });
		}
	  });
	});
  });

app.get('/listar/usuario/:id/ventas',verifyToken, (req, res) => {
	const datos =[
		{id:1,cliente:"empresa -A",total:2005,fecha:"2022-01-05"},
		{id:2,cliente:"empresa -B",total:205,fecha:"2022-01-01"},
		{id:3,cliente:"empresa -C",total:21005,fecha:"2022-01-30"},

	];
	res.json(datos);
});

app.listen(4000, () => console.log('hola soy el servidor'))