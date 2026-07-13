const multer = require('multer');
import { Router } from 'express';
import {createUserController,loginUserController,
        listServicesController,createServicesController,putServicesController, toggleServicesController, deleteServicesController,
        listStepsController,createStepsController, putStepsController,deleteStepsController,
        listContactController,putContactController,
        listHeroController,putHeroController, updateGalleryController, listGalleryController,deleteGalleryController
        
        } from '../controllers/bajo-cero.controller';

const router = Router()
const upload = multer({ dest: 'uploads/' });


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


router.get('/hero', listHeroController);
router.put('/hero/:id', putHeroController);

router.get('/gallery', listGalleryController);
router.delete('/gallery/:id', deleteGalleryController);
router.post('/gallery/files', upload.array('files'), updateGalleryController);





export default router;