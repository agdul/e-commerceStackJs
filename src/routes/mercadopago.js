const express = require('express');
const { tokenMiddelware } = require('../middlewares/verifyMiddleware');
const { createOrderHandler, webhookHandler } = require('../handlers/mercadopagoHandler');


const router = express.Router();

router.get('/create-order', tokenMiddelware, createOrderHandler);

router.get('/success', (req, res) => res.send('success') )

router.post('/webhook',webhookHandler)
  

module.exports = router;