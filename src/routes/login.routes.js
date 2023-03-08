import {Router} from 'express';
import{ createNewUserController, signController, recoverkeyController, changePassordController } from '../controllers/login.controller';
const { validateRegisterNew, validateSign , validateRecoverkey, validateChangePassword} = require('../validators/login.validator');

const router = Router()

// register
router.post('/register', validateRegisterNew, createNewUserController)

// login
router.post('/sign', validateSign , signController)

// recuperate
router.post('/recoverkey',validateRecoverkey, recoverkeyController)

// change passord
router.post('/changePassword', validateChangePassword, changePassordController)




export default router;