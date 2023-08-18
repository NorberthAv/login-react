import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { PDFViewer,Text, Document, Page, Image, View, StyleSheet } from '@react-pdf/renderer';
import QRCode from 'qrcode.react'; // U

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
    },
    qrCodeContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      },
      qrCode: {
        width: 100,
        height: 100
      }
});


export function VerPDF(IdEstudianteProp) {
    const [DataEstudiantepdf, setDataEstudiantepdf] = useState([]);
    const [qrCodeImagePaths, setQRCodeImagePaths] = useState([]);
    useEffect(() => {
        EstudianteDetalle();
        generateQRCodeImages(IdEstudianteProp.IdEstudianteProp); 
    }, []);

    const generateQRCodeImages = (IdEstudianteProp) => {
        // Implementa tu lógica para generar imágenes de códigos QR
        // Guarda las rutas de archivo de las imágenes en qrCodeImagePaths
        const qrCodePaths = [];
        DataEstudiantepdf.forEach((val, index) => {
            const url = `http://127.0.0.1:3000/detallados/${IdEstudianteProp}`;
            const qrCodeFileName = `qrcode_${val.id}.png`; // Nombre del archivo
            const qrCodeFilePath = `path/to/your/image/folder/${qrCodeFileName}`; // Ruta completa del archivo
            qrCodePaths.push(qrCodeFilePath);
        
            // Generar el código QR y guardarlo como archivo de imagen
            const qrCodeDataUrl = QRCode.toDataURL(url);
            // Aquí deberías implementar la lógica para guardar qrCodeDataUrl en qrCodeFilePath
            // Puedes usar alguna biblioteca para manejar la escritura de archivos en el servidor, como 'fs' si estás utilizando Node.js en el servidor.
          });
        
        // Genera las rutas de archivo y almacénalas en qrCodePaths
        setQRCodeImagePaths(qrCodePaths);
      };


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
                                    {qrCodeImagePaths.map((imagePath, index) => (
                                    <View key={index} style={styles.qrCodeContainer}>
                                        <Image src={imagePath} style={styles.qrCode} />
                                    </View>
                                    ))}
 
                                        {/* <Image
                                    src={<QRCode
                                        level="Q"
                                        style={{width: 256, marginBottom: 50 }}
                                        value={'hello world'}
                                    />}
                                    /> */}
                                        {/* <Image src={generateQRCodeImage(`http://127.0.0.1:3000/detallados/${val.id}`)} /> */}
                                        {/* <QRCode value={`http://127.0.0.1:3000/detallados/${val.id}`} size={100} bgColor="#282c34" fgColor="#fff" level="H" /> */}
                                        {/* { QRCodeToImage(`http://127.0.0.1:3000/detallados/${val.id}`) } */}
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

