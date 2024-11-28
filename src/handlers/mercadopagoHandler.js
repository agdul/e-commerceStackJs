const { viewCartController } = require('../controllers/cartController');
const { createOrderController } = require ('../controllers/mercadopagoController');
const { orderValidator } = require ('../validators/orderValidator');



const createOrderHandler = async (req, res) =>{
    try {
        const { error } = orderValidator.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const { userId } = req.user;

        console.log(userId)
         // Obtener los datos del carrito
        const cart = await viewCartController(userId);
        if(!cart) return res.status(400).send({ message: 'No hay productos en el carrito' });

        // Formatear los items del carrito para Mercado Pago
        console.log(cart)
        console.log(cart.items)

        // Crear la orden en Mercado Pago
        const response = await createOrderController(cart.items);

        return res.status(201).send(response);        
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { createOrderHandler }