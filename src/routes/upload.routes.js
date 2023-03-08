const multer = require('multer');
import { Router } from 'express';
import { updateController } from '../controllers/uploads.controller';

const upload = multer({ dest: 'uploads/' });
const router = Router()
router.post('/files', upload.array('files'), updateController)


export default router;

