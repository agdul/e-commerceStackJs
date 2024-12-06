const express = require('express');

const { tokenMiddelware } = require('../middlewares/verifyMiddleware');
const { getArticuloByIdHandlers, getAllArticuloHandlers, createArticuloHandlers, updateArticuloHandlers, deleteArticuloHandlers } = require('../handlers/productoHandler');
const { authAdmin } = require('../middlewares/authMiddleware');
const { uploadImgMiddleware } = require('../config/multerConfig');
const router = express.Router();


router.get('/', tokenMiddelware, authAdmin, getAllArticuloHandlers);
router.get('/:cod_articulo', tokenMiddelware, authAdmin, getArticuloByIdHandlers);
router.post('/', tokenMiddelware, authAdmin, uploadImgMiddleware.single('image'),createArticuloHandlers);
router.put('/:cod_articulo', tokenMiddelware, authAdmin, uploadImgMiddleware.single('image'),updateArticuloHandlers);
router.delete('/:articuloId/:imageId', tokenMiddelware, authAdmin, deleteArticuloHandlers); 


module.exports = router;