import { createContext, useState , useEffect  } from 'react';
import axios from 'axios';
import App from '../App';


export const VariablesContext = createContext();

export const VariablesProvider = ({ children }) => {

  
const [ActualizarBandeja, setActualizarBandeja] = useState(false);
const [DatosEstudiantes, setDatosEstudiantes] = useState([]);

const updateDatosEstudiantes = (newValues) => {
  setDatosEstudiantes(newValues);
};



// const estudianteslist = () =>{
//     console.log('enFuncion')
//     const response = axios.get('http://localhost:4000/get/estudiantes')
//     .then(response => {
//         if (response.status === 200) {
//             console.log(DatosEstudiantes,ActualizarBandeja,'Aqui')
//             setDatosEstudiantes(response.data);
//             localStorage.setItem('DatosEstudiantes', JSON.stringify([...DatosEstudiantes, ...response.data]));
//         } else {
//             console.log(response, 'Error');
//         }
//     })
//     .catch(error => {
//         console.error(error);
//     });
// }

console.log(DatosEstudiantes,ActualizarBandeja,'Aqui-No')

  // useEffect(() => {
  //   const listEstudiante = localStorage.getItem('DatosEstudiantes');
  //   if (listEstudiante) {
  //       setDatosEstudiantes(JSON.parse(listEstudiante));
  //   }
  // }, []);


  return (
    <VariablesContext.Provider value={
      {
        DatosEstudiantes, 
        setDatosEstudiantes,
        updateDatosEstudiantes,
        ActualizarBandeja,
        setActualizarBandeja 
        }}>
      {children}
    </VariablesContext.Provider>
  );
};