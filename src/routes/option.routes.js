const { verifyTokeAuth } = require('../middleware/tokeAuth');
import { Router } from 'express';
import{ tipoDocumentoController, generoController, listPlanActivoController, listCustomerController } from '../controllers/option.controller';

const router = Router()

// tipo documentos
router.get('/tipoDocumentos', tipoDocumentoController)

// generos
router.get('/generos', generoController)

// planes
router.get('/plan/:estado', listPlanActivoController)

// Listado CLientes
router.get('/listCustomer', verifyTokeAuth, listCustomerController)



export default router;
