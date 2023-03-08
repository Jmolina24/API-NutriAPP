const Client = require('ftp');
import config from '../config';
export async function getConnectionFTP() {
    try {
        const ftpClient = new Client();
        ftpClient.connect({
            host: config.ftpHost,
            user: config.ftpUser,
            password: config.ftpPassword
        });
        return ftpClient;
    } catch (error) {
        console.log('Error Conectando el FTP', error);
    }
}
