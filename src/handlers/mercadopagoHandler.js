const { viewCartController } = require('../controllers/cartController');
const { createOrderController } = require ('../controllers/mercadopagoController');
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

module.exports = { createOrderHandler }