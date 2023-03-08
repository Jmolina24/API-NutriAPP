const morgan = require('morgan');
const serveIndex = require('serve-index')
import express from 'express';
import config from './config';
import indexRouter from './routes/index.routes';
import loginRouter from './routes/login.routes';
import profileRouter from './routes/profile.routes';
import apidocsRouter from './routes/api-docs.routes';
import uploadRouter from './routes/upload.routes';
import optionRouter from './routes/option.routes';
import paymentsRouter from './routes/payments.routes';



const cors = require('cors')
const app = express();

// settings
app.set('port', config.port);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(config.express_static));
app.use(cors())
app.use(indexRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/upload', uploadRouter);
app.use('/api/v1/option', optionRouter);
app.use('/api/v1/payments', paymentsRouter);
app.use('/api/v1', apidocsRouter);



export default app