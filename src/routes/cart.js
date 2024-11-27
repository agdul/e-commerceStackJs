const express = require('express');
const { addProductoCartHandler, viewCartHandler } = require('../handlers/cartHandler');
const { tokenMiddelware } = require('../middlewares/verifyMiddleware');
const router = express.Router();

// Agregar producto al carrito
router.post('/add',tokenMiddelware, addProductoCartHandler);

// Ver carrito
router.get('/view',tokenMiddelware, viewCartHandler);

module.exports = router;
