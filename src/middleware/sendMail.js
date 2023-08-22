const nodemailer = require('nodemailer');
const templateMail = require('../json/templateMail.json');



import config from '../config';
var handlebars = require('handlebars');
var fs = require('fs');


const SendMailElectronic = (data) => {

    var readHTMLFile = function (path, callback) {
        fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };

    const sendMail = nodemailer.createTransport({
        host: config.hostPass,
        port: config.portPass,
        secure: true,
        auth: { user: config.mailUser, pass: config.mailPass }
    });

    let OptionsEmailTemplate = templateMail.find(({ id }) => id === data.id);

    readHTMLFile(OptionsEmailTemplate.path, function (err, html) {
        if (err) {
            console.log('error reading file', err);
            return;
        }
        switch (OptionsEmailTemplate.id) {
            case "1":
                var template = handlebars.compile(html);
                var replacements = { claveTemp: data.credencial };
                var htmlToSend = template(replacements);
                break;
            case "4":
                var template = handlebars.compile(html);
                var replacements = { tiempo: data.tiempo, valor: data.valor, nombre_plan: data.nombre_plan, fecha_pago: data.fecha_pago, id_transaccion: data.id_transaccion };
                var htmlToSend = template(replacements);
                break;
            default:
                var htmlToSend = html;
        }

        let mailOptions = {
            from: `"Notificación NutriApp" ${config.mailUser}`,
            to: data.email,
            bcc: 'jairmolina51@gmail.com,ivaacu@hotmail.com',
            subject: OptionsEmailTemplate.nombre,
            html: htmlToSend
        };

        sendMail.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('El correo se envío correctamente ' + info.response);
                // console.log(info);
            }
        });
    });

}


module.exports = { SendMailElectronic }