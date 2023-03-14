import { queriesAdmin, queriesLogin,getConnectionBD } from '../database';

const tipoDocumentos = require('../json/tipoDocumentos.json');
const generos = require('../json/generos.json');

export const tipoDocumentoController = async (req, res) => {
    try {
        res.send(tipoDocumentos);
    } catch (error) {
        res.status(500);
        res.json({ data: 'Error consultando la información', codigo: 1 })
    }
};

export const generoController = async (req, res) => {
    try {
        res.send(generos);
    } catch (error) {
        res.status(500);
        res.json({ data: 'Error consultando la información', codigo: 1 })
    }

};


export const listPlanActivoController = async (req, res) => {
    const { estado } = req.params;
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesLogin.getAllPlanActive,[estado], async function (err, rows, fields) {
            if (err) {
                return res.status(511).send(err);
            }
            res.status(200).send(rows[0]);
            await pool.end();
        })

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }

};



export const listCustomerController = async (req, res) => {
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesAdmin.p_listar_customer,async function (err, rows, fields) {
            if (err) {
                return res.status(511).send(err);
            }
            res.status(200).send(rows[0]);
            await pool.end();
        })

    } catch (error) {
        res.status(500).send(error);
    }

};


