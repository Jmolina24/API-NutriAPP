import app from './app';
const { Client } = require('basic-ftp');



app.listen(app.get('port'))

console.log(`🚀 Server on Port ${app.get('port')} 🚀`);    
