import { Router } from 'express';
import{ tipoDocumentoController, generoController, listPlanActivoController } from '../controllers/option.controller';

const router = Router()


// tipo documentos
router.get('/tipoDocumentos', tipoDocumentoController)

// generos
router.get('/generos', generoController)

// planes
router.get('/plan/:estado', listPlanActivoController)



export default router;
