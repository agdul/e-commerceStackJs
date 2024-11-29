const express = require('express');
const { addProductoCartHandler, viewCartHandler, emptyCartHandler, removeOneProductCartHandler, incrementOneProductHandler } = require('../handlers/cartHandler');
const { tokenMiddelware } = require('../middlewares/verifyMiddleware');

const router = express.Router();

// Agregar producto al carrito
router.post('/add',tokenMiddelware, addProductoCartHandler);

// Ver carrito
router.get('/view',tokenMiddelware, viewCartHandler);

// Vaciar carrito 
router.delete('/empty-cart', tokenMiddelware, emptyCartHandler);

// Eliminar un producto del carrito 
router.delete('/remove-product', tokenMiddelware, removeOneProductCartHandler);

// Incrementar la cantidad de un producto en el carrito
router.put('/increment-product', tokenMiddelware, incrementOneProductHandler);

module.exports = router;
