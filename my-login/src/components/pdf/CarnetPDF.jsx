import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import QRCode from "react-qr-code";
import { Page, Image, Text, View, Document, StyleSheet, Svg, Path } from '@react-pdf/renderer';

// const QRCodeSVG = ({ url }) => {
//     const qrSize = 100; // Tamaño del código QR

//     // Función para generar la URL del código QR
//     const generateQRCode = (url) => {
//       // Genera el SVG del código QR aquí (puedes usar una biblioteca como qr-svg para esto)
//       // Retorna el SVG como string
//       // Ejemplo: return '<svg>...</svg>';
//     };

//     const qrCodeSvg = generateQRCode(url);

//     return (
//       <Svg height={qrSize} width={qrSize} dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />
//     );
//   };
// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        justifyContent: 'justify-all',
        textAlign: 'justify',
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    col4center: {
        width: '40%',
        textAlign: 'center',
    },
    col6center: {
        width: '50%',
        textAlign: 'center',
    },
    col1center: {
        width: '10%',
        textAlign: 'center',
    }
});

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
                                <View style={styles.page}>
                                    <View style={styles.col4center}>
                                        <View className='foto_perfil_detalle'>
                                            <Image src={`data:image/jpg;base64,${val.fotoEstudiante}`} className='img-perfiles' alt="foto de perfil" />
                                        </View>
                                    </View>
                                    <View style={styles.col6center}>
                                        <Text>Datos del Estudiante</Text>
                                        <View style={styles.section}>
                                            {/* <Text>Id: {val.id}</p> */}
                                            <Text>Nombre: {val.nombreEstudiante}</Text>
                                            <Text>Cédula: {val.cedulaEstudiante}</Text>
                                            <Text>Edad: {val.edadEstudiante}</Text>
                                            <Text>Nivel: {val.nivelEstudiante}</Text>
                                            <Text>Grupo: {val.grupoEstudiante}</Text>
                                            <Text>Mensualidad: {val.mensualidadEstudiante}</Text>
                                            <Text>Fecha de ingreso: {
                                                moment(val.fechaIngresoEstudiante).format('DD/MM/YYYY')
                                            }</Text>
                                            <Text>Estado:
                                                {(() => {
                                                    switch (val.estado_solvencia) {
                                                        case 1:
                                                            return ' Solvente';
                                                        case 2:
                                                            return ' Deudor';
                                                        case 3:
                                                            return ' Deudor Recurrente';
                                                        default:
                                                            return '';
                                                    }
                                                })()}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.col1center}>
                                        <QRCode
                                            level="Q"
                                            style={{ width: 256, marginBottom: 50 }}
                                            value={'hello world'}
                                        />
                                        {/* <Image
                                    src={<QRCode
                                        level="Q"
                                        style={{width: 256, marginBottom: 50 }}
                                        value={'hello world'}
                                    />}
                                    /> */}
                                        {/* <Image src={`data:image/svg+xml;utf8,${encodeURIComponent(<QRCode value={`http://127.0.0.1:3000/detallados/${val.id}`} />)}`} /> */}
                                        {/* <QRCode value={`http://127.0.0.1:3000/detallados/${val.id}`} size={100} bgColor="#282c34" fgColor="#fff" level="H" /> */}
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

