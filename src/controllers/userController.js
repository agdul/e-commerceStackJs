const users = require('../db/dataBase');
const { hashPassword } = require('../security/hashPass');

const createUserController = async (name, username, email, password, role) =>{
    if(users.some(user => user.email === email)) throw new Error('El usuario ya existe');
    
    const id = users.length + 1;
    const hashedPassword = await hashPassword(password);
    console.log(hashPassword);
    const newUserController = {id, name, username, email, password: hashedPassword, role};
    users.push(newUserController);
    return newUserController;
};

const getAllUserController = () => {
    if (!users.length) throw new Error('No hay usuarios');
    return users;
};

const getUserByNameController = (name) => {
    const userByName = users.filter((user) => user.name === name);
    if (!userByName.length) throw new Error('No hay usuarios con ese nombre');
    return userByName;
};

const getUserByIdController = (id) =>{
    const userById = users.find(user => user.id === Number(id));
    if(!userById) throw new Error('No existe el id');
    return userById;
};

const updateUserController = async (id, name, username, email, password, role) => {
    const isNumeric = Number(id);
    
    const newUser = {id: isNumeric, name, username, email, role};

    // Si se proporciona una nueva contraseña, se hashea
    if (password){
        newUser.password = await hashPassword(password);
    }
    
    const userById = users.find((users) => users.id === isNumeric);

    if(userById){
        Object.assign(userById, newUser);
        const { password: _, ...userWhatSeePw } = userById;
        return {message: 'Usuario editado correctamente', userById: userWhatSeePw};
    }else{
        throw new Error('No se pudo modificar del user');
    }
    return userById;
};

const deleteUserController = (id) => {
    const numericId = Number(id);
    const index = users.findIndex((users) => users.id === numericId);
    if(index !== -1){
        const [deleteUser] = users.splice(index, 1)
        return deleteUser;
    }else{
        throw new Error('No se pudo eliminar el usuario');
    }
};

module.exports = { createUserController, getAllUserController, getUserByNameController, getUserByIdController, updateUserController, deleteUserController };