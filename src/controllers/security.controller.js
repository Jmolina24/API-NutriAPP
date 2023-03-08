import config from '../config';
const fs = require('fs');


export const listFilesController = async (req, res) => {
    const { key, ambient } = req.params;
    let urlFile = '';
    switch (ambient) {
        case 'W':
            urlFile = 'http://localhost:4000/';
            break;
        case 'L':
            urlFile = 'https://api-nutriapp.fly.dev/';
            break;
        default:
            res.status(401)
            res.send(`<h1 style="color: red;">Area Restrigida para la visualización de datos </h1>
        <br>
        <p> <strong>   Esta función del navegador está pensada para desarrolladores. Si alguien te indicó que copiaras y pegaras algo aquí para habilitar una función de NutriAPP o para "hackear" la cuenta de alguien, se trata de un fraude. Si lo haces, esta persona podrá acceder a tu cuenta.</strong></p>`);
            return;
            break;
    }


    if (key === config.adminnutriapp) {
        fs.readdir(config.express_static, (error, archivos) => {
            let fotos = '';
            archivos.forEach((data, index, arreglo) => {
                fotos += `<li><a href="${urlFile}${arreglo[index]}">${arreglo[index]}</a></li><br>`
            });
            res.status(200).send(`<ul type="circle">${fotos}</ul>`);
        })
    } else {
        res.status(401)
        res.send(`<h1 style="color: red;"> Area Restrigida para la visualización de datos </h1>
        <br>
        <p> <strong>   Esta función del navegador está pensada para desarrolladores. Si alguien te indicó que copiaras y pegaras algo aquí para habilitar una función de NutriAPP o para "hackear" la cuenta de alguien, se trata de un fraude. Si lo haces, esta persona podrá acceder a tu cuenta.</strong></p>`);
    }

};
