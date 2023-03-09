const jwt = require("jsonwebtoken");
import { getConnectionBD, queriesProfile } from '../database';
import mailer from '../middleware/sendMail';

export const listProfileController = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesProfile.listProfileUser, [id], async function (err, rows, fields) {
            if (err) {
                return res.status(511).send(err);
            }
            const result = rows[0];
            res.status(200).send(result);
            await pool.end();
        })

    } catch (error) {
        res.status(500).send(error);
    }
};

export const seguimientoUserController = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesProfile.listSeguimientoHistorialUser, [id], async function (err, rows, fields) {
            if (err) {
                return res.status(511).send(err);
            }
            const result = rows[0];
            res.status(200).send(result);
            await pool.end();
        })

    } catch (error) {
        res.status(500).send(error);
    }
};

export const historialPagosController = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesProfile.listHistorialPagosUser, [id], async function (err, rows, fields) {
            if (err) {
                return res.status(511).send(err);
            }
            const result = rows[0];
            res.status(200).send(result);
            await pool.end();
        })

    } catch (error) {
        res.status(500).send(error);
    }
};

export const historialIMCController = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesProfile.listHistorialIMCUser, [id], async function (err, rows, fields) {
            if (err) {
                return res.status(511).send(err);
            }
            const result = rows[0];
            res.status(200).send(result);
            await pool.end();
        })

    } catch (error) {
        res.status(500).send(error);
    }
};

export const createSeguimientoController = async (req, res) => {
    const { id, peso, estatura, talla_cintura, talla_cadera, foto_frontal, foto_lateral, foto_espalda } = req.body
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesProfile.createSeguimientoUser, [id, peso, estatura, talla_cintura, talla_cadera, foto_frontal, foto_lateral, foto_espalda],
            async function (err, rows, fields) {
                if (err) {
                    return res.status(511).send(err);
                }
                const result = rows[0][0];
                switch (result.codigo) {
                    case 0:
                        res.status(200).send(result);
                        break;
                    case 1:
                        res.status(400).send(result);
                        break;
                    default:
                        console.log(result);
                        res.status(400).json({ mensaje: 'Error Conexion', codigo: "1" })
                        break;
                }
                await pool.end();
            })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const listSeguimientosPendienteController = async (req, res) => {
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesProfile.listSeguimientosPendientes, async function (err, rows, fields) {
            if (err) {
                return res.status(511).send(err);
            }
            const result = rows[0];
            res.status(200).send(result);
            await pool.end();
        })

    } catch (error) {
        res.status(500).send(error);
    }
};

export const responseSeguimientoController = async (req, res) => {
    const { id_seguimiento, comentarios, plan_adjunto } = req.body;
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesProfile.respondeSeguimiento, [id_seguimiento, comentarios, plan_adjunto],
            async function (err, rows, fields) {
                if (err) {
                    return res.status(511).send(err);
                }
                const result = rows[0][0];
                switch (result.codigo) {
                    case 0:
                        res.status(200).send(result);    
                        let data = { email: result.correo, id: "3" }
                        mailer.SendMailElectronic(data);                        
                        break;
                    case 1:
                        res.status(400).send(result);
                        break;
                    default:
                        console.log(result);
                        res.status(400).json({ mensaje: 'Error Conexion', codigo: "1" })
                        break;
                }
                await pool.end();
            })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const userPaymetController = async (req, res) => {
    const { id, marca} = req.body
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesProfile.p_marca_user_pago, [id, marca],
            async function (err, rows, fields) {
                if (err) {
                    return res.status(511).send(err);
                }
                const result = rows[0][0];
                switch (result.codigo) {
                    case 0:
                        res.status(200).send(result);
                        break;
                    case 1:
                        res.status(400).send(result);
                        break;
                    default:
                        console.log(result);
                        res.status(400).json({ mensaje: 'Error Conexion', codigo: "1" })
                        break;
                }
                await pool.end();
            })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
