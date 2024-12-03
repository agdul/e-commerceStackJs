
const {client, Preference, Payment, mercadopago} = require ('../mp/mercadopagoConfig');

const createOrderController = async (items, userId) => {
    try {
        
        // Para pasar bien los datos a la api de mp debes asegurarte de que cada artículo sea incluido como un objeto en el array items de la preferencia.
        //console.log(items);
        const formatedItems = items.map((item)=>({
            title: String(item.title),
            quantity: item.quantity,
            unit_price: item.unit_price,
            description: String(item.description),  //Descripcion del artículo
            id: item.id,
            category_id: 'others',
            currency_id: 'ARS',
        }))

        //console.log('Format item :', formatedItems);
        
        // Crear la preferencia(orden de pago) de Mercado Pago
        const preference = new Preference(client);
        const result = await preference.create({
            body : {
                items: formatedItems,
                payer:{
                    email: 'user@example.com', //email del usuario que va a realizar el pago
                    first_name: 'Jane',
                    last_name: 'Doe'
                },
                back_urls: {
                    success: 'https://8559wr4w-3001.brs.devtunnels.ms/mercadopago/webhook', //url de redirección al éxito
                    failure: 'https://8559wr4w-3001.brs.devtunnels.ms/mercadopago/webhook', //url de redirección al fracaso
                    pending: 'https://8559wr4w-3001.brs.devtunnels.ms/mercadopago/webhook' //url de redirección al pago pendiente
                },
                auto_return: 'approved', 
                metadata : { //metadata: info adicinal que nosotros queramos mandar/mantener puede ser viste despues de los diferentes estados de orden 
                    user_id: userId,
                    order_summary: formatedItems,
                    custom_note: "Gracias por su compra"
                }
            }
        });

        console.log('Preference:', result)

        //console.log('Preferencia creada:', preference.body);

        return {
            init_point: result.init_point, 
            order_details: formatedItems 
        };
        
    } catch (error) {
        throw new Error(error.message);
    }
};


const getPaymentDetails = async (paymentId) => { //Detalle de la orden de pago 
    try { 
        // Obtener detalles del pago
        const preference = await new Preference(client).get(paymentId);
     
        console.log('Detalles del pago:', preference);

        //const paymentDetails = await preference.get(paymentId);

        //console.log('Detalles1 del pago:', preference);
        // Verifica si la respuesta es exitosa
        if (preference.status === 200 && preference.response) {
        const paymentStatus = preference.response.status;
  
        // Verifica si el estado del pago es 'approved'
        if (paymentStatus === 'approved') {
          console.log("Pago aprobado. Procesando...");
          // Aquí puedes registrar el pago en tu base de datos, enviar notificaciones, etc.
        } else {
          console.log(`Pago no aprobado. Estado: ${paymentStatus}`);
        }
      } else {
        console.error('No se pudieron obtener los detalles del pago.');
      }

        // console.log('Metadata:', client.response.metadata);
        // console.log('Metadata:', client.response.status);
        

    } catch(error){
        console.error('Error obteniendo detalles del pago:', error.message);
    }
}

const consultarPagoController = async (idComprobante) => {
    try {
        const paymentDetails = await client.payment
        
    } catch (error) {
        throw new Error(error.message);
    }
}



module.exports = { createOrderController, getPaymentDetails };
