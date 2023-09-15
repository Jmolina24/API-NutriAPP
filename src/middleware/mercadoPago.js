import mercadopago from 'mercadopago';

export async function getConnectionMercadoPago() {
    try {
        // const pool = await mercadopago.configure({ access_token: "APP_USR-5233268223613523-011711-5e0fc63826301d0b585d19e3789a0a47-1286595710" });
        const pool = await mercadopago.configure({ access_token: "TEST-443702263127551-082416-6157f401d18d23d63a397229685ea6be-1459998320" });

        
        return pool;
    } catch (error) {
        console.log(error);
    }
}
export { mercadopago };