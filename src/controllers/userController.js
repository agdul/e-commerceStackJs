const { User } = require('../models/userModel');

const { hashPassword } = require('../security/hashPass');

const createUserController = async (name, username, email, password, role) =>{
    // if(users.some(user => user.email === email)) throw new Error('El usuario ya existe');
    const hashedPassword = await hashPassword(password);
    const newUserController = User ({name, username, email, password: hashedPassword, role});
    newUserController.save();
    return newUserController;
};

const getAllUserController = async() => {
    if (!User.length) throw new Error('No hay usuarios');
    return await User.find();
};

const getUserByNameController = async(name) => {
    const userByName = await User.find({name});
    if (!userByName.length) throw new Error('No hay usuarios con ese nombre');
    return userByName;
};

const getUserByIdController = async(id) =>{
    const userById = await User.findById(id);
    if(!userById) throw new Error('No existe el id');
    return userById;
};

const updateUserController = async (id, name, username, email, password, role) => {
    const newUser = {name, username, email, role};

    if(password) {
        const hashedPassword = await hashPassword(password);
        newUser.password = hashedPassword;
    }

    const updateUser = await User.findByIdAndUpdate(id, newUser, {new: true});
    if(!updateUser) throw new Error('No se pudo actualizar el usuario');

    return updateUser;

    
};

const deleteUserController = async(id) => {
   try {
    const deleteUser = await User.findByIdAndDelete(id);
    if(!deleteUser) throw new Error('No se pudo eliminar el usuario');
    return 'El usuario ha sido eliminado correctamente';

    } catch (error) {
        throw new Error('No se pudo eliminar el usuario');
    }
};

module.exports = { createUserController, getAllUserController, getUserByNameController,getUserByIdController, updateUserController, deleteUserController };