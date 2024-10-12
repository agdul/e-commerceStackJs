const users = require('../db/dataBase');

const createUserController = (name, username, email) =>{
    const id = users.length + 1;
    const newUserController = {id, name, username, email};
    if (!name || !username || !email) throw new Error('Faltan datos');
    users.push(newUserController);
    return newUserController;
}

const getAllUserController = () => {
    if (!users.length) throw new Error('No hay usuarios');
    return users;
}

const getUserByNameController = (name) => {
    const userByName = users.filter((user) => user.name === name);
    if (!userByName.length) throw new Error('No hay usuarios con ese nombre');
    return userByName;
}

const getUserByIdController = (id) =>{
    const userById = users.find(user => user.id === Number(id));
    if(!userById) throw new Error('No existe el id');
    return userById;
}

const updateUserController = (id, name, username, email) => {
    const newUser = {id, name, username, email};
    const userById = users.find((users) => users.id === Number(id));
    if(userById){
        Object.assign(userById, newUser);
    }else{
        throw new Error('No se pudo modificar del user');
    }
    return userById;
}

const deleteUserController = () => {
    const index = users.findIndex((users) => users.id === Number(id));
    let deleteUser = null;
    if(index !== -1){
        [deleteUser] = users.splice(index, 1)
    }else{
        throw new Error('No se pudo eliminar el usuario');
    }
    return deleteUser;
}
module.exports = { createUserController, getAllUserController, getUserByNameController, getUserByIdController, updateUserController, deleteUserController };