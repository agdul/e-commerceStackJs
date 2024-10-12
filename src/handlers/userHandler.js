// const Joi = require("joi");
const { createUserController, getAllUserController, getUserByNameController, getUserByIdController, updateUserController, deleteUserController } = require("../controllers/userController");
// const userSchema = require('joi');
// const userSchema = Joi.object({
//     name: Joi.string().min(3).required(),
//     username: Joi.string().min(3).required(),
//     email: Joi.string().email().required()
// });

const getAllUserHandler = (req, res) => {    
    try {
        const { name } = req.query;
        if (name) {
            const response = getUserByNameController(name);
            res.send(response);
        } else {
            const response = getAllUserController();
            console.log(response);
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(400).send({Error : error.message});
    }
};

const getOneUserHandler = (req, res) => {
    try {
        const {id} = req.params;
        const response = getUserByIdController(id);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({Error: error.message});
    }
}

const setNewUserHandler = (req, res) => {
    try {
        const {name, username, email } = req.body;
        const response = createUserController(name, username, email);
        res.status(201).send(response);        
    } catch (error) {
        res.status(400).send({Error: error.message});
    }
}

const editUserHandler = (req, res) => {
    try {
        const {id} = req.params;
        const {name, username, email} = req.body;
        const response = updateUserController(id, name, username, email);
        res.send(response);
    } catch (error) {
        res.status(400).send({Error: error.message});
    }
}

const deleteUserHandler = (req, res) =>{
    try {
        const { id } = req.params;
        const response = deleteUserController(id);
        res.send(response);
    } catch (error) {
        res.status(400).send({Error: error.message});
    }
}
module.exports = { getAllUserHandler, getOneUserHandler, setNewUserHandler, editUserHandler, deleteUserHandler };