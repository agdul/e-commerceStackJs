
const { createUserController, getAllUserController, getUserByNameController, getUserByIdController, updateUserController, deleteUserController } = require("../controllers/userController");
const { userValidator, userUpdateValidator } = require("../validators/userValidator");

const getAllUserHandler = async(req, res) => {    
    try {
        const { name } = req.query;
        if (name) {
            const response = await getUserByNameController(name);
            return res.status(200).send(response);
        } else {
            const response = await getAllUserController();
            console.log(response);
            return res.status(200).send(response);
        }
    } catch (error) {
        return res.status(400).send({Error : error.message});
    }
};

const getOneUserHandler = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await getUserByIdController(id);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send({Error: error.message});
    }
};

const setNewUserHandler = async (req, res) => {
    try {
        const { error } = userValidator.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const {name, username, email, password, role } = req.body;
        const response = await createUserController(name, username, email, password, role);
        return res.status(201).send(response);   

    } catch (error) {
        return res.status(400).send({Error: error.message});
    }
};

const editUserHandler = async (req, res) => {
    try {
        const { error } = userUpdateValidator.validate(req.body);
        if(error){return res.status(400).send({Error: error.details[0].message})};

        const {id} = req.params;
        const {name, username, email, password, role} = req.body;
        const response = await updateUserController(id, name, username, email, password, role);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send({Error: error.message});
    }
};

const deleteUserHandler = async (req, res) =>{
    try {
        const { id } = req.params;
        const response = await deleteUserController(id);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send({Error: error.message});
    }
};

module.exports = { getAllUserHandler, getOneUserHandler, setNewUserHandler, editUserHandler, deleteUserHandler };