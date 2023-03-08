import { Router } from 'express';
import{ createOrderPayments, notificationOrderPayment, PaymentController } from '../controllers/payments.controller';
const { verifyTokeAuth } = require('../middleware/tokeAuth');
const router = Router()


// crear pago
// router.post('/createOrder', verifyTokeAuth, createOrderPayments);
router.post('/createOrder',createOrderPayments);

router.get('/:id_web/notificationPayment', notificationOrderPayment);

router.get('/:payment_id/Payment', PaymentController);


export default router;

