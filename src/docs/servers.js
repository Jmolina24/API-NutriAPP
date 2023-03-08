import config from '../config';
module.exports = {
    servers: [
        {
            url: `http://localhost:${config.port}`,
            description: "Servidor Local"
        },
        {
            url: `https://api-nutriapp.fly.dev`,
            description: "Servidor Desarrollo"
        },
    ]
}