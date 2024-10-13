const express = require('express');
const { getAllUserHandler, getOneUserHandler, setNewUserHandler, editUserHandler, deleteUserHandler } = require('../handlers/userHandler');
const { tokenMiddelware  } = require('../middlewares/verifyMiddleware');
const { authAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllUserHandler);

router.get('/:id', getOneUserHandler);

router.post('/', setNewUserHandler);

router.put('/:id', tokenMiddelware, authAdmin, editUserHandler);

router.delete('/:id', deleteUserHandler);

module.exports = router;