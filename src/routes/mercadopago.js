const express = require('express');
const { tokenMiddelware } = require('../middlewares/verifyMiddleware');
const { createOrderHandler } = require('../handlers/mercadopagoHandler');


const router = express.Router();

router.get('/create-order', tokenMiddelware, createOrderHandler);

router.get('/success', (req, res) => res.send('success') )

router.get('/webhook',  (req, res) => res.send('webhook'))

module.exports = router;