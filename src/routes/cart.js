const express = require('express');
const {  addProductoCartHandler, viewCartHandler } = require('../handlers/cartHandler');
const router = express.Router();

// Agregar producto al carrito
router.post('/add', addProductoCartHandler);

// Ver carrito
router.get('/view', viewCartHandler);

module.exports = router;
