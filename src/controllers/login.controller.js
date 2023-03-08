const { tokenSign } = require('../middleware/tokeAuth');
import { queriesLogin, getConnectionBD } from '../database';
import mailer from '../middleware/sendMail';

export const createNewUserController = async (req, res) => {
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
        fecha_nacimiento, tipo_documento, num_documento, email, telefono,
        genero, password, plan_id, peso, estatura, talla_cintura, talla_cadera, foto_frontal, foto_lateral, foto_espalda } = req.body

    try {
        const pool = await getConnectionBD();
        pool.execute(queriesLogin.createNewUser,
            [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, tipo_documento, num_documento, email, telefono,
                genero, password, plan_id, peso, estatura, talla_cintura, talla_cadera, foto_frontal, foto_lateral, foto_espalda], async function (err, rows, fields) {
                    if (err) {
                        return res.status(511).send({mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });
                    }
                    const result = rows[0][0];
                    switch (result.codigo) {
                        case 0:
                            let data = { email: email, id: "2" }
                            mailer.SendMailElectronic(data);
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
        await pool.end();
        res.status(500).send(error);
    }

};

export const signController = async (req, res) => {
    const { usuario, password } = req.body;
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesLogin.sign, [usuario, password], async function (err, rows, fields) {
            if (err) { res.status(511).send({mensaje: "Error Query BD", codigo: "1", mensaje_bd: err }); }
            const result = rows[0][0];
            switch (result.codigo) {
                case 0:
                    const tokenSession = await tokenSign(result.id);
                    result.token = tokenSession;
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
        res.status(500).send(error);
    }

}

export const recoverkeyController = async (req, res) => {
    const { correo } = req.body;
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesLogin.recoverkey, [correo], async function (err, rows, fields) {
            if (err) { res.status(511).send({mensaje: "Error Query BD", codigo: "1", mensaje_bd: err });}
            const result = rows[0][0];
            switch (result.codigo) {
                case 0:
                    let data = { email: correo, credencial: result.generada, id: "1" }
                    mailer.SendMailElectronic(data);
                    res.status(200).json({ mensaje: result.mensaje, codigo: "0" })
                    break;
                case 1:
                    res.status(400).json({ mensaje: result.mensaje, codigo: "1" })
                    break;
                default:
                    console.log(result);
                    res.status(400).json({ mensaje: 'Error Conexion', codigo: "1" })
                    break;
            }
            await pool.end();
        })
    } catch (error) {
        res.status(500).send(error);
    }

};

export const changePassordController = async (req, res) => {
    const { user_id, clave_nueva } = req.body;
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesLogin.changePassword, [user_id, clave_nueva], async function (err, rows, fields) {
            if (err) { return res.status(511).send({mensaje: "Error Query BD", codigo: "1", mensaje_bd: err }); }
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
        res.status(500).send(error);
    }
    pool.end();
}