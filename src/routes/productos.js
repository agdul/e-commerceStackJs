const express = require('express');

const { tokenMiddelware } = require('../middlewares/verifyMiddleware');
const { getArticuloByIdHandlers, getAllArticuloHandlers, createArticuloHandlers, updateArticuloHandlers, deleteArticuloHandlers } = require('../handlers/productoHandler');
const { authAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();


router.get('/', tokenMiddelware, authAdmin, getAllArticuloHandlers);
router.get('/:cod_articulo', tokenMiddelware, authAdmin, getArticuloByIdHandlers);
router.post('/', tokenMiddelware, authAdmin, createArticuloHandlers);
router.put('/:cod_articulo', tokenMiddelware, authAdmin, updateArticuloHandlers);
router.delete('/:cod_articulo', tokenMiddelware, authAdmin, deleteArticuloHandlers); 


module.exports = router;