import sql from 'mssql';
import config from '../config';

const dbSettings = {
    server: config.dbServer,
    database: config.dbDatabase,
    user: config.dbUser,
    password: config.dbPassword,
    encrypt: true,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustServerCertificate: true
    }
}

export async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings)
        console.log(pool);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

export { sql };