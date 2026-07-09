const mysql = require('mysql2');
import config from '../config';
const dbSettingsNord = {
    host: config.dbServerNord,
    port: config.dbPortNord,
    user: config.dbUserNord,
    password: config.dbPasswordNord,
    database: config.dbDatabaseNord,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}


export async function getConnectionBDNord() {
    try {
        const poolNord = await mysql.createPool(dbSettingsNord);
        return poolNord;
    } catch (error) {
        console.log(error);
        return error;
    }
}