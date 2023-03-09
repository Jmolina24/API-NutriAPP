const { verifyTokeAuth } = require('../middleware/tokeAuth');
import {Router} from 'express';
import{ createSeguimientoController, historialIMCController, historialPagosController, listProfileController, listSeguimientosPendienteController, 
    seguimientoUserController, responseSeguimientoController, userPaymetController } from '../controllers/profile.controller';


const router = Router()

// Profile
router.get('/user/:id',verifyTokeAuth,listProfileController)

// // Seguimiento Usuarios
router.get('/tracing/:id',verifyTokeAuth,seguimientoUserController)

// // Historial Pagos
router.get('/payment-history/:id',verifyTokeAuth, historialPagosController)

// // Historial IMC
router.get('/imc-history/:id',verifyTokeAuth,historialIMCController)

// // Create Seguimiento
router.post('/tracing',verifyTokeAuth, createSeguimientoController)

// Listar Seguimientos Pendientes
router.get('/tracing-slopes', verifyTokeAuth,listSeguimientosPendienteController)

// Respuesta Seguimiento
router.post('/tracing-response', verifyTokeAuth, responseSeguimientoController)

// Marcar al usuario excento del pago
router.post('/user-paymet', verifyTokeAuth, userPaymetController)


export default router;