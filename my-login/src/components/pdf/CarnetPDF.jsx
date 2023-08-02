import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import QRCode from "react-qr-code";
import { Page,Image, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

// // Create Document Component
// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Section #1</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// );
export function VerPDF(IdEstudianteProp) {

    const [DataEstudiantepdf, setDataEstudiantepdf] = useState([]);
    useEffect(() => {
        EstudianteDetalle();
    }, []);

    console.log(IdEstudianteProp.IdEstudianteProp
    );
    const EstudianteDetalle = async () => {

        let IdEstudiante = IdEstudianteProp.IdEstudianteProp;

        try {
            const response = await axios.post('http://localhost:4000/detalle/estudiantes', {
                // email: email,
                IdEstudiante: IdEstudiante,

            });

            console.log(response.data, 'aqui');
            if (response.status == 200) {
                setDataEstudiantepdf([response.data])
            } else if (response.status == 202) {

                alert('error');
            }
            console.log(DataEstudiantepdf);

        } catch (error) {

            console.error(error);

        }
    }


    return <>
        <Document>
            <Page size="A4">
            {
                DataEstudiantepdf.map((val, key) => {
                    return <View key={key} className='card '>
                        <View className="card-body">
                            <View className="row">
                                <View className="col-4">
                                    <View className='foto_perfil_detalle'>
                                        <Image src={`data:image/jpg;base64,${val.fotoEstudiante}`} className='img-perfiles' alt="foto de perfil" />
                                    </View>
                                </View>
                                <View className="col-6 center">
                                    <Text>Datos del Estudiante</Text>
                                    <View className='carta-estudiante-datos justify'>
                                        {/* <Text>Id: {val.id}</p> */}
                                        <Text><strong>Cédula:&nbsp;</strong>{val.cedulaEstudiante}</Text>
                                        <Text><strong>Nombre:&nbsp;</strong>{val.nombreEstudiante}</Text>
                                        <Text><strong>Edad:&nbsp;</strong>{val.edadEstudiante}</Text>
                                        <Text><strong>Nivel:&nbsp;</strong>{val.nivelEstudiante}</Text>
                                        <Text><strong>Grupo:&nbsp;</strong>{val.grupoEstudiante}</Text>
                                        <Text><strong>Mensualidad:&nbsp;</strong>{val.mensualidadEstudiante}</Text>
                                        <Text><strong>Fecha de ingreso:&nbsp;</strong>{
                                            moment(val.fechaIngresoEstudiante).format('DD/MM/YYYY')
                                        }</Text>
                                        <Text><strong>Estado:&nbsp;</strong>
                                            {(() => {
                                                switch (val.estado_solvencia) {
                                                    case 1:
                                                        return 'Solvente';
                                                    case 2:
                                                        return 'Deudor';
                                                    case 3:
                                                        return 'Deudor Recurrente';
                                                    default:
                                                        return '';
                                                }
                                            })()}
                                        </Text>
                                    </View>
                                </View>
                                <View className='col-2'>
                                    <QRCode value={`http://127.0.0.1:3000/detallados/${val.id}`} size={100} bgColor="#282c34" fgColor="#fff" level="H" />
                                </View>
                            </View>
                        </View>
                    </View>
                })
            }
            </Page>
        </Document>
    </>
}

