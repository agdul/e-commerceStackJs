const express = require('express');
const { createOrderHandler } = require('../handlers/mercadopagoHandler');


const router = express.Router();

router.get('/create-order', createOrderHandler);

router.get('/success', (req, res) => res.send('success') )

router.get('/webhook',  (req, res) => res.send('webhook'))

module.exports = router;