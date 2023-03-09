import { getConnectionMercadoPago, mercadopago } from '../middleware/mercadoPago';
import { getConnectionBD, queriesPayment } from '../database';
import mailer from '../middleware/sendMail';


export const createOrderPayments = async (req, res) => {
    await getConnectionMercadoPago();
    const { titulo, cantidad, precio_unitario, id_web } = req.body;
    var preference = {
        items: [{
            title: titulo,
            quantity: Number(cantidad),
            currency_id: 'COP',
            unit_price: Number(precio_unitario)
        }],
        payment_methods: {
            excluded_payment_types: [
                {
                    id: "ticket"
                }
            ]
        },
        back_urls: {
            "success": `https://api-nutriapp.fly.dev/api/v1/payments/${id_web}/notificationPayment`,
            "failure": `https://api-nutriapp.fly.dev/api/v1/payments/${id_web}/notificationPayment`,
            "pending": `https://api-nutriapp.fly.dev/api/v1/payments/${id_web}/notificationPayment`,
        },
        auto_return: "approved"
    };
    try {
        await getConnectionMercadoPago();
        mercadopago.preferences.create(preference).then((result) => {
            return res.status(result.status).send({ url: result.body.init_point, id: result.body.id, sandbox_init_point: result.body.sandbox_init_point });
        }).catch((err) => {
            return res.status(403).send(err);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const notificationOrderPayment = async (req, res) => {
    const { payment_id, status, merchant_order_id, preference_id, collection_id, merchant_account_id, payment_type } = req.query;
    const { id_web } = req.params;
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesPayment.p_registra_pago, [payment_id, status, merchant_order_id, preference_id, collection_id, merchant_account_id, id_web, payment_type],
            function (err, rows, fields) {
                if (err) {
                    return res.status(511).send(err);
                }
                if (status == 'approved') {
                    res.redirect(`/api/v1/payments/${payment_id}/Payment`);
                } else {
                    res.status(409).send('Pago se encuentra rechazado, por favor validar nuevamente');
                }
            })
    } catch (error) {
        res.status(500).send(error);
    }
}

export const PaymentController = async (req, res) => {
    const { payment_id } = req.params;
    try {
        const pool = await getConnectionBD();
        pool.execute(queriesPayment.p_notifica_pago, [payment_id], function (err, rows, fields) {
            if (err) {
                return res.status(511).send(err);
            }
            let result = rows[0][0];
            let data = { email: result.correo, tiempo: result.tiempo, valor: result.valor, nombre_plan: result.nombre_plan, fecha_pago: result.fecha_pago, id_transaccion: result.payment_id, id: "4" }
            mailer.SendMailElectronic(data);
            res.redirect('https://www.google.com');
            console.log('Pago Realizado con EL Payment_Id: ' + payment_id);
        })

    } catch (error) {
        console.log('Error Controlador PaymentController', error);
        res.status(500).send('Payment_Id: ' + payment_id);
    }
}