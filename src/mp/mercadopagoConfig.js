const { MercadoPagoConfig, Payment, Preference, MercadoPago} = require('mercadopago');
const accessToken = process.env.MP_ACCESS_TOKEN;
const mercadopago = require ('mercadopago');


if (!accessToken) {
    console.error("⚠️ [Mercado Pago] ACCESS_TOKEN no está definido en el archivo .env. Verifica tu configuración.");
    throw new Error("No se encontró ACCESS_TOKEN en las variables de entorno. La configuración de Mercado Pago no se puede establecer.");
}
//mercadopago.configurations.setAccessToken(accessToken);


//MercadoPago.configurations.setAccessToken(accessToken);
//const client = new MercadoPagoConfig({accessToken});
const client = new MercadoPagoConfig({accessToken});
//const payment = new Payment(client);
//const client = new MercadoPago({accessToken: accessToken});
//client.configurations.setAccessToken(accessToken);

console.log("✅ [Mercado Pago] Configuración establecida correctamente.");

console.log(client);




module.exports = { client, Payment, Preference, MercadoPago};
