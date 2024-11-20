const { addProductToCartController, viewCartController } = require('../controllers/cartController');

const addProductoCartHandler = async (req, res) => {
  try {
    const { userId } = req; // Asegúrate de que el middleware de autenticación añada `userId` al objeto `req`.
    const { cod_articulo, quantity } = req.body; cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo

    if (!cod_articulo || !quantity) {
      return res.status(400).send({ error: 'Se requiere cod_articulo y quantity' });
    }

    const response = await addProductToCartController(userId, cod_articulo, quantity);
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const viewCartHandler = async (req, res) => {
  try {
    const { userId } = req;

    const response = await viewCartController(userId);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { addProductoCartHandler, viewCartHandler };
