const mysql = require('mysql2');
import config from '../config';
const dbSettings = {
    host: config.dbServer,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}


export async function getConnectionBD() {
    try {
        const pool = await mysql.createPool(dbSettings);
        return pool;
    } catch (error) {
        console.log(error);
        return error;
    }
}