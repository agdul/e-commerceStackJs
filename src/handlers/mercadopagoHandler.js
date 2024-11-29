const { viewCartController } = require('../controllers/cartController');
const { createOrderController, getPaymentDetails } = require ('../controllers/mercadopagoController');
const { orderValidator } = require ('../validators/orderValidator');

const createOrderHandler = async (req, res) =>{
    try {
        const { userId } = req.user;
         // Obtener los datos del carrito
        const cart = await viewCartController(userId);

        if(!cart || !cart.items.length) return res.status(400).send({ message: 'No hay productos en el carrito' });

        // Crear la orden en Mercado Pago
        const response = await createOrderController(cart.items, userId);
        return res.status(201).send(response);        
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const webhookHandler = async (req, res) => {
    try {
        res.status(200).send('OK');
        console.log('Headers:', req.headers);
        console.log('Body recibido:', req.body);

        const notification = req.body;

        const { id, topic, type } = notification;

        console.log(notification);
        if (topic === 'payment' || type === 'payment') {
            await getPaymentDetails(id);
        } else {
            console.log(`Tema de la notificación no esperado: ${topic}`);
        }

    } catch (error) {
        console.error('Error procesando el webhook:', error.message);
        res.status(500).send('Error interno');
    }
};

module.exports = { createOrderHandler, webhookHandler }