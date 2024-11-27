const { addProductToCartController, viewCartController } = require('../controllers/cartController');
const { addProductToCartValidator, cartValidator } = require('../validators/cartValidator');

const addProductoCartHandler = async (req, res) => {
  try {
    const { error } = addProductToCartValidator.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const { userId } = req.user; // Asegúrate de que el middleware de autenticación añada `userId` al objeto `req`.
    const { cod_articulo, quantity } = req.body;
    const response = await addProductToCartController(userId, cod_articulo, quantity);
    return res.status(201).send(response);
    
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const viewCartHandler = async (req, res) => {
  try {
    // const { error } = cartValidator.validate(req.query);
    // if (error) {
    //   return res.status(400).send({ error: error.details[0].message });
    // }
    const { userId } = req.user;
    const response = await viewCartController(userId);
    return res.status(200).send(response);

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { addProductoCartHandler, viewCartHandler };
