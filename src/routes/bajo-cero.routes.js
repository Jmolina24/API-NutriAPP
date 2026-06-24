import { Router } from 'express';
import {createUserController,loginUserController,
        listServicesController,createServicesController,putServicesController, toggleServicesController, deleteServicesController,
        listStepsController,createStepsController, putStepsController,deleteStepsController,
        listContactController,putContactController
        
        } from '../controllers/bajo-cero.controller';

const router = Router()

// register
router.post('/register', createUserController)

// login
router.post('/login', loginUserController)

router.get('/services', listServicesController);
router.post('/services', createServicesController);
router.put('/services/:id', putServicesController);
router.patch('/services/:id/toggle', toggleServicesController);
router.delete('/services/:id', deleteServicesController);


router.get('/process-steps', listStepsController);
router.post('/process-steps', createStepsController);
router.put('/process-steps/:id', putStepsController);
router.delete('/process-steps/:id', deleteStepsController);

router.get('/contact', listContactController);
router.put('/contact/:id', putContactController);
export default router;