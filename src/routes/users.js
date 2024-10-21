const express = require('express');
const { getAllUserHandler, getOneUserHandler, setNewUserHandler, editUserHandler, deleteUserHandler } = require('../handlers/userHandler');
const { tokenMiddelware  } = require('../middlewares/verifyMiddleware');
const { authAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', tokenMiddelware, getAllUserHandler);

router.get('/:id', tokenMiddelware, getOneUserHandler);

router.post('/', tokenMiddelware, authAdmin, setNewUserHandler);

router.put('/:id', tokenMiddelware, authAdmin, editUserHandler);

router.delete('/:id', tokenMiddelware, authAdmin, deleteUserHandler);

module.exports = router;