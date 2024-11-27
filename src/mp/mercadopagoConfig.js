const mercadopago = require('mercadopago');
import mercadopago from 'mercadopago'

const accessToken = process.env.ACCESS_TOKEN;

if (!accessToken) {
    console.error("⚠️ [Mercado Pago] ACCESS_TOKEN no está definido en el archivo .env. Verifica tu configuración.");
    throw new Error("No se encontró ACCESS_TOKEN en las variables de entorno. La configuración de Mercado Pago no se puede establecer.");
}



// Configuración de Mercado Pago
mercadopago.configure({
    access_token: accessToken,
});

console.log("✅ [Mercado Pago] Configuración establecida correctamente.");

module.exports = mercadopago;
