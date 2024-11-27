const { MercadoPagoConfig, Payment, Preference } = require('mercadopago');
const accessToken = process.env.MP_ACCESS_TOKEN;


if (!accessToken) {
    console.error("⚠️ [Mercado Pago] ACCESS_TOKEN no está definido en el archivo .env. Verifica tu configuración.");
    throw new Error("No se encontró ACCESS_TOKEN en las variables de entorno. La configuración de Mercado Pago no se puede establecer.");
}

const client = new MercadoPagoConfig({accessToken});
console.log("✅ [Mercado Pago] Configuración establecida correctamente.");




module.exports = { client, Payment, Preference };
