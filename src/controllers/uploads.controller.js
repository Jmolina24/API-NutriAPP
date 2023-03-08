import { getConnectionFTP } from '../database';
import { v4 as uuidv4 } from 'uuid';
const fs = require('fs');
const path = require('path');

export const updateController = async (req, res) => {
    const files = req.files;
    console.log(files.length);
    if (files.length == 0) {
        return res.status(400).json({ codigo: 1, mensaje: 'Se Debe Cargar los documentos necesarios' });
    }
    const ftp = await getConnectionFTP();
    ftp.on('ready', () => {
        console.log('Conectado al servidor FTP');
        const uploadFile = (file, callback) => {
            const extension = path.extname(file.originalname).toLowerCase();
            const uuid = uuidv4();
            const serverFilename = `${uuid}${extension}`;
            const readStream = fs.createReadStream(file.path);
            switch (extension) {
                case '.pdf':
                    var remotoDirFTP = '/uploads/seguimientos/' + serverFilename;
                    break;
                case '.jpg':
                case '.jpeg':
                case '.png':
                case '.tif':
                case '.tiff':
                    var remotoDirFTP = '/uploads/registration/' + serverFilename;
                    break;
                default:
                    var remotoDirFTP = '/uploads/' + serverFilename;
                    break;
            }
            ftp.put(readStream, remotoDirFTP, (err) => {
                if (err) {
                    console.log('Error al subir el archivo', err);
                    callback(err);
                } else {
                    console.log(`Archivo ${serverFilename} subido con éxito`);
                    callback(null, {
                        fieldname: file.fieldname,
                        originalname: file.originalname,
                        encoding: file.encoding,
                        mimetype: file.mimetype,
                        destination: file.destination,
                        filename: serverFilename,
                        path: remotoDirFTP,
                        size: file.size
                    });
                }
                fs.unlinkSync(file.path); // eliminar archivo en uploads
            });
        };

        const uploadFiles = (files, callback) => {
            if (files.length === 0) {
                callback(null, []);
                return;
            }

            const file = files.shift();
            uploadFile(file, (err, data) => {
                if (err) {
                    callback(err);
                } else {
                    uploadFiles(files, (err, results) => {
                        if (err) {
                            callback(err);
                        } else {
                            results.unshift(data);
                            callback(null, results);
                        }
                    });
                }
            });
        };

        uploadFiles(files, (err, results) => {
            ftp.end();
            console.log('Desconectado del servidor FTP');
            if (err) {
                console.error(err);
                res.status(400).json({ codigo: 1, mensaje: 'Error al subir el archivo' });
            } else {
                res.status(200).json({ codigo: 0, mensaje: 'Archivos subidos con éxito', rutas: results });
            }
        });
    });

    ftp.on('error', (err) => {
        console.log('Error', err);
        res.status(400).json({ codigo: 1, mensaje: 'Error al subir el archivo' });
    });

};