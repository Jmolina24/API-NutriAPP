import { getConnectionFTP, getConnectionBDNord} from '../database';
//import fs from 'fs/promises';
import crypto from 'crypto';

const { tokenSign } = require('../middleware/tokeAuth');
import { v4 as uuidv4 } from 'uuid';
const fs = require('fs');
const path = require('path');

export const createUserController = async (req, res) => {

    const { nombre, apellido, tipo_documento, num_documento, email, telefono, user, password } = req.body;

    if (!nombre || !apellido || !tipo_documento || !num_documento || !email || !telefono || !user || !password) {
        return res.status(400).json({ code: "1", message: "Datos inválidos" });
    }

    try {
        const poolNord = await getConnectionBDNord();

        // Validar si el usuario ya existe
        poolNord.execute(`SELECT id FROM users WHERE num_documento = ? OR email = ? OR username = ?`, [num_documento, email, user], (err, rows) => {

            if (err) {
                return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
            }

            if (rows.length > 0) {
                return res.status(409).json({ code: "1", message: "Ya existe información registrada con los datos suministrados." });
            }

            const id = crypto.randomUUID();
            poolNord.execute(`INSERT INTO users ( id, nombre, apellido, tipo_documento, num_documento, email, telefono, username, password, createdAt, updatedAt ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`, [id, nombre, apellido, tipo_documento, num_documento, email, telefono, user, password], (err) => {
                if (err) {
                    return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                }
                return res.status(201).json({ code: "0", message: "Usuario creado correctamente", data: { id, nombre, apellido, tipo_documento, num_documento, email, telefono, user } });
            }
            );

        }
        );

    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "createUserController", details: error });
    }

};

export const loginUserController = async (req, res) => {
    const { user, password } = req.body;

    try {
        const poolNord = await getConnectionBDNord();

        poolNord.execute('SELECT * FROM users WHERE username = ? AND password = ?', [user, password], async (err, rows) => {

            if (err) {
                return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
            }

            if (rows.length === 0) {
                return res.status(401).json({ code: "1", message: "Usuario o contraseña incorrectos" });
            }

            const existingUser = rows[0];
            const tokenSession = await tokenSign(existingUser.id);

            const userData = {
                id: existingUser.id,
                nombre: existingUser.nombre,
                apellido: existingUser.apellido,
                token: tokenSession
            };
            return res.status(200).json({ code: "0", message: "Login exitoso", data: userData });
        }
        );

    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "loginUserController", details: error });
    }
};


export const listServicesController = async (req, res) => {
    try {
        const poolNord = await getConnectionBDNord();
        poolNord.execute('SELECT * FROM services', [], async function (err, rows, fields) {
            if (err) {
                return res.status(511).send({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
            }
            const result = rows;
            await poolNord.end();
            return res.status(200).json({ code: "0", message: "Lista de servicios obtenida correctamente", data: parseBoolean(result) });
        })
    } catch (error) {
        // await poolNord.end();
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "listServicesController", details: error });
    }
}


export const createServicesController = async (req, res) => {

    const { icon, color, title, desc, items, active } = req.body;

    try {

        if (!icon || !color || !title || !desc || !Array.isArray(items) || items.length === 0 || typeof active !== "boolean") {
            return res.status(400).json({ code: "1", message: "Datos inválidos" });
        }

        const poolNord = await getConnectionBDNord();

        // Validar si el servicio ya existe
        poolNord.execute(`SELECT id FROM services WHERE LOWER(title) = LOWER(?)`, [title], (err, rows) => {
            if (err) {
                return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
            }

            if (rows.length > 0) {
                return res.status(409).json({ code: "1", message: "Ya existe un servicio registrado con ese título." });
            }

            const id = crypto.randomUUID();

            poolNord.execute(`INSERT INTO services ( id, icon, color, title, \`desc\`, items, active, createdAt, updatedAt ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`, [id, icon, color, title, desc, JSON.stringify(items), active], (err) => {

                if (err) {
                    return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                }
                return res.status(201).json({ code: "0", message: "Servicio creado correctamente", data: { id, icon, color, title, desc, items, active } });
            }
            );

        }
        );

    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "createServicesController", details: error });
    }
};


export const putServicesController = async (req, res) => {

    const { id } = req.params;
    const { icon, color, title, desc, items, active } = req.body;

    try {

        if (!icon || !color || !title || !desc || !Array.isArray(items) || items.length === 0 || typeof active !== "boolean") {
            return res.status(400).json({ code: "1", message: "Datos inválidos" });
        }

        const poolNord = await getConnectionBDNord();
        // Validar que el servicio exista
        poolNord.execute("SELECT id FROM services WHERE id = ?", [id], (err, rows) => {

            if (err) {
                return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
            }

            if (rows.length === 0) {
                return res.status(404).json({ code: "1", message: "Servicio no encontrado" });
            }

            // Validar que no exista otro servicio con el mismo título
            poolNord.execute(`SELECT id FROM services WHERE LOWER(title) = LOWER(?) AND id <> ?`, [title, id], (err, rowsTitle) => {

                if (err) {
                    return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                }

                if (rowsTitle.length > 0) {
                    return res.status(409).json({ code: "1", message: "Ya existe un servicio con ese título." });
                }

                // Actualizar
                poolNord.execute(`UPDATE services SET icon = ?, color = ?, title = ?, \`desc\` = ?, items = ?, active = ?, updatedAt = NOW() WHERE id = ?`, [icon, color, title, desc, JSON.stringify(items), active, id],
                    (err) => {

                        if (err) {
                            return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                        }
                        return res.status(200).json({ code: "0", message: "Servicio actualizado correctamente", data: { id, icon, color, title, desc, items, active } });
                    }
                );

            }
            );

        }
        );

    } catch (error) {

        return res.status(500).json({
            code: "1",
            message: "Internal Server Error",
            error: "putServicesController",
            details: error
        });

    }

};


export const toggleServicesController = async (req, res) => {

    const { id } = req.params;

    try {

        const poolNord = await getConnectionBDNord();

        poolNord.execute(`SELECT id, active FROM services WHERE id = ?`, [id], (err, rows) => {

            if (err) {
                return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
            }

            if (rows.length === 0) {
                return res.status(404).json({ code: "1", message: "Servicio no encontrado" });
            }

            const active = rows[0].active ? 0 : 1;

            poolNord.execute(`UPDATE services SET active = ?, updatedAt = NOW() WHERE id = ?`, [active, id], (err) => {

                if (err) {
                    return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                }

                return res.status(200).json({
                    code: "0", message: "Estado del servicio actualizado correctamente", data: { id, active: Boolean(active) }
                });
            }
            );
        }
        );

    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "toggleServicesController", details: error });
    }
};


export const deleteServicesController = async (req, res) => {

    const { id } = req.params;

    try {
        const poolNord = await getConnectionBDNord();

        // Validar que el servicio exista
        poolNord.execute(`SELECT * FROM services WHERE id = ?`, [id], (err, rows) => {

            if (err) {
                return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
            }

            if (rows.length === 0) {
                return res.status(404).json({ code: "1", message: "Servicio no encontrado" });
            }
            const deletedService = rows[0];
            // Eliminar servicio
            poolNord.execute(`DELETE FROM services WHERE id = ?`, [id], (err) => {
                if (err) {
                    return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                }
                return res.status(200).json({ code: "0", message: "Servicio eliminado correctamente", data: deletedService });
            }
            );

        }
        );

    } catch (error) {

        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "deleteServicesController", details: error });
    }
};


export const listStepsController = async (req, res) => {
    try {
        const poolNord = await getConnectionBDNord();
        poolNord.execute('SELECT * FROM seccion', [], async function (err, rows, fields) {
            if (err) {
                return res.status(511).send({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
            }
            const result = rows;
            await poolNord.end();
            return res.status(200).json({ code: "0", message: "Lista de secciones obtenida correctamente", data: parseBoolean(result) });
        })
    } catch (error) {
        // await poolNord.end();
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "listStepsController", details: error });
    }
}

export const createStepsController = async (req, res) => {

    const { num, icon, title, descripcion } = req.body;
    try {
        if (!num || !icon || !title || !descripcion) {
            return res.status(400).json({ code: "1", message: "Datos inválidos" });
        }

        const poolNord = await getConnectionBDNord();

        // Validar que la sección no exista
        poolNord.execute( `SELECT id FROM seccion WHERE LOWER(title) = LOWER(?) OR num = ?`, [title, num], (err, rows) => {
            if (err) {
                    return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                }

                if (rows.length > 0) {
                    return res.status(409).json({ code: "1", message: "La sección ya existe" });
                }

                const id = crypto.randomUUID();

                poolNord.execute( `INSERT INTO seccion ( id, num, icon, title, descripcion, createdAt, updatedAt ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`, [ id, num, icon, title, descripcion ], (err) => {
                    if (err) { 
                        return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                        }

                        return res.status(201).json({ code: "0", message: "Sección creada correctamente", data: { id, num, icon, title, descripcion } });
                    }
                );
            }
        );
    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "createStepsController", details: error });
    }
}

export const putStepsController = async (req, res) => {

    const { id } = req.params;
    const { num, icon, title, descripcion } = req.body;
    try {
        if (!num || !icon || !title || !descripcion) { 
            return res.status(400).json({ code: "1", message: "Datos inválidos"
            });
        }

        const poolNord = await getConnectionBDNord();

        // Validar que la sección exista
        poolNord.execute( `SELECT id FROM seccion WHERE id = ?`, [id], (err, rows) => {

                if (err) {
                    return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                }

                if (rows.length === 0) {
                    return res.status(404).json({ code: "1", message: "Sección no encontrada" });
                }

                // Validar que no exista otra sección con el mismo título o número
                poolNord.execute( `SELECT id FROM seccion WHERE (LOWER(title) = LOWER(?) OR num = ?) AND id <> ?`, [title, num, id], (err, rowsSection) => {

                        if (err) {
                            return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                        }

                        if (rowsSection.length > 0) {
                            return res.status(409).json({ code: "1", message: "Ya existe una sección registrada con ese título o número." });
                        }

                        // Actualizar sección
                        poolNord.execute( `UPDATE seccion SET num = ?, icon = ?, title = ?, descripcion = ?, updatedAt = NOW() WHERE id = ?`, [ num, icon, title, descripcion, id ],
                            (err) => {

                                if (err) {
                                    return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                                }
                                return res.status(200).json({ code: "0", message: "Sección actualizada correctamente", data: { id, num, icon, title, descripcion }
                                });
                            }
                        );
                    }
                );
            }
        );

    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "putStepsController", details: error });
    }
};


export const deleteStepsController = async (req, res) => {

    const { id } = req.params;
    try {

        const poolNord = await getConnectionBDNord();

        // Validar que la sección exista
        poolNord.execute( `SELECT * FROM seccion WHERE id = ?`, [id], (err, rows) => {
                if (err) {
                    return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                }
                if (rows.length === 0) {
                    return res.status(404).json({ code: "1", message: "Sección no encontrada" });
                }
                const deletedSection = rows[0];
                // Eliminar sección
                poolNord.execute( `DELETE FROM seccion WHERE id = ?`, [id],
                    (err) => {

                        if (err) {
                            return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                        }
                        return res.status(200).json({ code: "0", message: "Sección eliminada correctamente", data: deletedSection });
                    }
                );
            }
        );
    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "deleteStepsController", details: error });
    }
};


export const listContactController = async (req, res) => {
    try {
        const poolNord = await getConnectionBDNord();
        poolNord.execute('SELECT * FROM contact', [], async function (err, rows, fields) {
            if (err) {
                return res.status(511).send({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
            }
            const result = rows;
            await poolNord.end();
            return res.status(200).json({ code: "0", message: "Lista de contactos obtenida correctamente", data: result });
        })
    } catch (error) {
        // await poolNord.end();
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "listContactController", details: error });
    }
}

export const putContactController = async (req, res) => {

    const { id } = req.params;
    const { whatsapp, phone, email, city, schedule } = req.body;

    try {
        if (!whatsapp || !phone || !email || !city || !schedule) {
            return res.status(400).json({ code: "1", message: "Datos inválidos" });
        }

        const poolNord = await getConnectionBDNord();

        // Validar que el contacto exista
        poolNord.execute( `SELECT * FROM contact WHERE id = ?`, [id], (err, rows) => {

                if (err) {
                    return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                }

                if (rows.length === 0) {
                    return res.status(404).json({ code: "1", message: "Contacto no encontrado" });
                }

                // Actualizar contacto
                poolNord.execute( `UPDATE contact SET whatsapp = ?, phone = ?, email = ?, city = ?, schedule = ?, updatedAt = NOW() WHERE id = ?`, [ whatsapp, phone, email, city, schedule, id ], (err) => {
                    if (err) {
                            return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                        }

                        return res.status(200).json({ code: "0", message: "Contacto actualizado correctamente", data: { id, whatsapp, phone, email, city, schedule } });
                    }
                );
            }
        );
    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "putContactController", details: error });
    }
};

export const listHeroController = async (req, res) => {
    try {
        const poolNord = await getConnectionBDNord();
        poolNord.execute('SELECT * FROM hero', [], async function (err, rows, fields) {
            if (err) {
                return res.status(511).send({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
            }
            const result = rows;
            await poolNord.end();
            return res.status(200).json({ code: "0", message: "Lista de héroes obtenida correctamente", data: parseBoolean(result) });
        })
    } catch (error) {
        // await poolNord.end();
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "listHeroController", details: error });
    }





}

export const putHeroController = async (req, res) => {

    const { id } = req.params;
    const { badge, headline, headlineHighlight, subtext, stats } = req.body;

    try {

        if ( !badge || !headline || !headlineHighlight || !subtext || !Array.isArray(stats) || stats.length === 0  || stats.some(stat => !stat.value || !stat.label ) ) {
            return res.status(400).json({ code: "1", message: "Datos inválidos" });
        }

        const poolNord = await getConnectionBDNord();

        // Validar que el Hero exista
        poolNord.execute( `SELECT * FROM hero WHERE id = ?`, [id], (err, rows) => {

                if (err) {
                    return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                }

                if (rows.length === 0) {
                    return res.status(404).json({ code: "1", message: "Hero no encontrado" });
                }
                // Actualizar Hero
                poolNord.execute( `UPDATE hero SET badge = ?, headline = ?, headlineHighlight = ?, subtext = ?, stats = ?, updatedAt = NOW() WHERE id = ?`, [ badge, headline, headlineHighlight, subtext, JSON.stringify(stats), id ], (err) => {
                        if (err) {
                            return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                        }

                        return res.status(200).json({
                            code: "0",
                            message: "Hero actualizado correctamente",
                            data: { id, badge, headline, headlineHighlight, subtext, stats }
                        });
                    }
                );
            }
        );

    } catch (error) {

        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "putHeroController", details: error });

    }

};


export const listGalleryController = async (req, res) => {
    const { category } = req.query;
    try {
        const poolNord = await getConnectionBDNord();
        let query = "SELECT * FROM gallery WHERE active = '1' ";
        let params = [];
        if (category) { 
            query += " AND category = ?"; 
            params.push(category); 
        }
        poolNord.execute(query, params, function (err, rows) {
            if (err) {
                return res.status(511).send({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
            }
            return res.status(200).json({ code: "0", message: "Lista de galería obtenida correctamente", data: parseBoolean(rows) });
        });

    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "listGalleryController", details: error });
    }
};

export const updateGalleryController = async (req, res) => {
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
                    var remotoDirFTP = '/uploads/' + serverFilename;
                    break;
                case '.jpg':
                case '.jpeg':
                case '.png':
                case '.tif':
                case '.tiff':
                    var remotoDirFTP = '/uploads/' + serverFilename;
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


export const deleteGalleryController = async (req, res) => {
    const { id } = req.params;
    try {
        const poolNord = await getConnectionBDNord();

        // Validar que la sección exista
        poolNord.execute( `SELECT * FROM gallery WHERE id = ?`, [id], (err, rows) => {
                if (err) {
                    return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                }
                if (rows.length === 0) {
                    return res.status(404).json({ code: "1", message: "Galería no encontrada" });
                }
                const deletedSection = rows[0];
                // Eliminar sección
                poolNord.execute( `UPDATE gallery SET active = 0 WHERE id = ?`, [id],
                    (err) => {
                        if (err) {
                            return res.status(511).json({ mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                        }
                        return res.status(200).json({ code: "0", message: "Galería eliminada correctamente", data: parseBoolean(deletedSection) });
                    }
                );
            }
        );
    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "deleteGalleryController", details: error });
    }

}

const parseBoolean = (data, fields = ['active']) => {
    if (!data) return data;

    const parse = (item) => {
        const result = { ...item };

        fields.forEach(field => {
            if (field in result) {
                result[field] = Boolean(result[field]);
            }
        });

        return result;
    };

    return Array.isArray(data)
        ? data.map(parse)
        : parse(data);
};