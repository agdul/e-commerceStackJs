
const {client, Preference, Payment, mercadopago} = require ('../mp/mercadopagoConfig');

const createOrderController = async (items, userId) => {
    try {
        
        // Para pasar bien los datos a la api de mp debes asegurarte de que cada artículo sea incluido como un objeto en el array items de la preferencia.
        console.log(items);
        const formatedItems = items.map((item)=>({
            id: item.id,
            title: item.title,
            description: item.description,  //Descripcion del artículo
            quantity: item.quantity,
            currency_id: 'ARS',
            unit_price: item.unit_price,
        }))
        console.log(formatedItems)

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

        //console.log('Preferencia creada:', preference);

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
        // Obtener detalles del pago
        const payment = new Payment(client);
     
        console.log('Detalles del pago:', payment);

        const paymentDetails = await payment.get(paymentId);

        console.log('Detalles1 del pago:', paymentDetails);
        // Verifica si la respuesta es exitosa
        if (paymentDetails.status === 200 && paymentDetails.response) {
        const paymentStatus = paymentDetails.response.status;
  
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




module.exports = { createOrderController, getPaymentDetails };
