
const {client, Preference} = require ('../mp/mercadopagoConfig');

const createOrderController = async (items, userId) => {
    try {

        // Para pasar bien los datos a la api de mp debes asegurarte de que cada artículo sea incluido como un objeto en el array items de la preferencia.

        const formatedItems = items.map((item)=>({
            title: item.title,
            quantity: item.quantity,
            currency_id: 'ARS',
            unit_price: item.unit_price,
        }))

         // Crear la preferencia(orden de pago) de Mercado Pago
        const preference = await new Preference(client).create({
            body : {
                items: formatedItems,
                metadata : { //metadata: info adicinal que nosotros queramos mandar/mantener puede ser viste despues de los diferentes estados de orden 
                    user_id: userId,
                    order_summary: formatedItems,
                    custom_note: "Gracias por su compra"
                }
            }
        });

        return {
            init_point: preference.init_point, 
            order_details: formatedItems 
        };
        
    } catch (error) {
        throw new Error(error.message);
    }
};


const getPaymentDetails = async (paymentId) => { //Detalle de la orden de pago 
    try { 
        const payment = await client.get(`/v1/payments/${paymentId}`);
        console.log('Detalles del pago:', payment.response);
        console.log('Metadata:', payment.response.metadata);
        console.log('Metadata:', payment.response.status);
    } catch(error){
        console.error('Error obteniendo detalles del pago:', error.message);
    }
}
module.exports = { createOrderController, getPaymentDetails };
