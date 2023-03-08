import {config} from 'dotenv';
config();

export default {
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbDatabase: process.env.DB_DATABASE || '',
    dbServer: process.env.DB_SERVER || '',
    mailUser: process.env.USER_MAIL || '',
    mailPass: process.env.PASS_MAIL || '',
    hostPass: process.env.HOST_MAIL || '',
    portPass: process.env.PORT_MAIL || '',
    express_static: process.env.EXPRESS_STATIC || '',
    ftpHost: process.env.FTP_HOST || '',
    ftpUser: process.env.FTP_USER || '',
    ftpPassword: process.env.FTP_PASSWORD || '',
    jwtSecret: process.env.JWT_SECRET || '',
    version: '2.2.2'    
}