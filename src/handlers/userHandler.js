
const { createUserController, getAllUserController, getUserByNameController, getUserByIdController, updateUserController, deleteUserController } = require("../controllers/userController");
const { userSchema } = require("../schemas/userSchema");


const getAllUserHandler = (req, res) => {    
    try {
        const { name } = req.query;
        if (name) {
            const response = getUserByNameController(name);
            return res.send(response);
        } else {
            const response = getAllUserController();
            console.log(response);
            return res.status(200).send(response);
        }
    } catch (error) {
        return res.status(400).send({Error : error.message});
    }
};

const getOneUserHandler = (req, res) => {
    try {
        const {id} = req.params;
        const response = getUserByIdController(id);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send({Error: error.message});
    }
}

const setNewUserHandler = async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const {name, username, email, password, role } = req.body;
        const response = await createUserController(name, username, email, password, role);
        return res.status(201).send(response);        
    } catch (error) {
        return res.status(400).send({Error: error.message});
    }
}

const editUserHandler = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if(error){
        return res.status(400).send({Error: error.details[0].message})};

    try {
        const {id} = req.params;
        const {name, username, email, password, role} = req.body;
        const response = await updateUserController(id, name, username, email, password, role);
        return res.send(response);
    } catch (error) {
        return res.status(400).send({Error: error.message});
    }
}

const deleteUserHandler = (req, res) =>{
    try {
        const { id } = req.params;
        const response = deleteUserController(id);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send({Error: error.message});
    }
}
module.exports = { getAllUserHandler, getOneUserHandler, setNewUserHandler, editUserHandler, deleteUserHandler };