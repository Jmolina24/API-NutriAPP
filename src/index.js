import app from './app';

app.listen(app.get('port'))

console.log(`🚀 Server on Port ${app.get('port')} 🚀`);    